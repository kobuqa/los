import {forwardRef, useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {Controller} from "react-hook-form";
import {createFilterOptions} from "@mui/material";

interface FetchAutocompleteProps {
	label: string;
	fetchFn: Function;
	createFn?: Function;
	control: any;
	name: string;
	extractedProp?: string;
	getOptionLabelFn?: any;
	multiple?: boolean;
}

const filter = createFilterOptions<any>();

const FetchAutocomplete = forwardRef<HTMLInputElement, FetchAutocompleteProps>(
	({
		 label,
		 fetchFn,
		 multiple = false,
		 name,
		 control,
		 createFn,
		 extractedProp = 'id',
		 getOptionLabelFn = (option: any) => option.name
	 }, ref) => {
		const [open, setOpen] = useState(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);
		const [options, setOptions] = useState<any[]>([]);
		const [value, setValue] = useState<any[] | any>(() => multiple ? [] : null);
		const [inputValue, setInputValue] = useState('')

		const loading = open && options.length === 0;

		const handleAddValues = (data: any) => {
			if(!data) return null
			return data.length ? data.map((dataItem: any) => dataItem[extractedProp]) : data[extractedProp];
		}

		useEffect(() => {
			let active = true;

			if (!loading) return undefined;

			(async () => {
				const response = await fetchFn()
				if (active) setOptions(response.data);
			})();

			return () => {
				active = false;
			};
		}, [loading, fetchFn]);

		useEffect(() => {
			if (!open) setOptions([])
		}, [open]);

		return (
			<Controller
				control={control}
				name={name}
				render={
					({field, formState: {errors}}) => {
						return (

							<Autocomplete
								fullWidth
								filterSelectedOptions
								multiple={multiple}
								limitTags={2}
								open={open}
								value={value}
								onOpen={() => setOpen(true)}
								onClose={() => setOpen(false)}
								isOptionEqualToValue={(option, value) => option.id === value.id}
								getOptionLabel={getOptionLabelFn}
								options={options}
								loading={loading}
								onChange={(_, value) => {
									if (multiple) {
										const createdItem = value.find((item: { [key: string]: unknown }) => !item[extractedProp])
										if (!createdItem) {
											setValue(() => value);
											return field.onChange(handleAddValues(value));
										}
										return createFn && (async () => {
											setIsFetching(true);
											const result = await createFn([{name: inputValue}])
											setIsFetching(false);
											field.onChange(handleAddValues([...value.slice(0, -1), ...result.data]));
											setValue((prev: any) => ([...prev, ...result.data]))
										})()
									}
									setValue(() => value);
									field.onChange(handleAddValues(value));
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);
									const {inputValue} = params;
									const isExisting = options.some((option) => option.name.toLowerCase() === inputValue.toLowerCase());
									if (inputValue !== '' && !isExisting && createFn) filtered.push({name: `Add: ${inputValue}`});
									return filtered;
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								renderInput={(params) => (
									<TextField
										{...params}
										ref={ref}
										label={label}
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{loading || isFetching ?
														<CircularProgress color="inherit" size={20}/> : null}
													{params.InputProps.endAdornment}
												</>
											),
										}}
										value={inputValue}
										onChange={(event) => setInputValue(event.target.value)}
										error={!!errors[name]}
									/>
								)}
							/>
						)
					}
				}

			/>
		)
	}
)


export default FetchAutocomplete;
