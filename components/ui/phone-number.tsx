import { useState } from 'react';

import i18nIsoCountries from 'i18n-iso-countries';
import enCountries from "i18n-iso-countries/langs/en.json";

import {
    type CountryCallingCode, type E164Number
} from 'libphonenumber-js';
import PhoneInput, { type Country } from 'react-phone-number-input/input';
import { Input } from '../ui/input';

type CountryOption = {
    value: Country;
    label: string;
    indicatif: CountryCallingCode;
};

i18nIsoCountries.registerLocale(enCountries);

export const PhoneNumber = ({
    control,
    error,
    onChange,
}: {
    control: any;
    error: string | undefined;
    onChange: (value: unknown) => void;
}) => {
    const options = getCountriesOptions().filter((option) =>
        'RU' !== option.value
    );
    const defaultCountryOption = options.find((option) => option.value === 'ES');

    const [country, setCountry] = useState<CountryOption>(
        defaultCountryOption || options[0]!,
    );
    const [phoneNumber, setPhoneNumber] = useState<E164Number>();

    const onCountryChange = (value: CountryOption) => {
        setPhoneNumber(undefined);
        setCountry(value);
    };

    return (
        <div className="flex items-center gap-2">
            <ComboboxCountryInput
                value={country}
                onValueChange={onCountryChange}
                options={options}
                placeholder="Find your country..."
                renderOption={({ option }) =>
                    `${isoToEmoji(option.value)} ${option.label}`
                }
                renderValue={(option) => option.label}
                emptyMessage="No country found."
            />
            <div className={`${!!error ? 'border ring-destructive/20 border-destructive rounded-md' : ''} flex-1`}>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (<PhoneInput
                        international
                        withCountryCallingCode
                        country={country.value.toUpperCase() as Country}
                        {...field}
                        value={phoneNumber}
                        inputComponent={Input}
                        onChange={(value) => {
                            setPhoneNumber(value);
                            onChange(value as string);
                        }}
                    />
                    )}
                />
            </div>
        </div>
    );
};

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type ComboboxCountryInputProps<T extends Option> = {
    value: T;
    onValueChange: (value: T) => void;
    options: T[];
    renderOption: ({
        option,
        isSelected,
    }: {
        option: T;
        isSelected: boolean;
    }) => React.ReactNode;
    renderValue: (option: T) => string;
    emptyMessage: string;
    placeholder?: string;
    className?: string;
};

function ComboboxCountryInput<T extends Option>({
    value,
    onValueChange,
    options,
    renderOption,
    renderValue,
    placeholder,
    emptyMessage,
}: ComboboxCountryInputProps<T>) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    variant="ghost"
                    className="h-12 border border-input dark:bg-background dark:hover:bg-input rounded-md"
                >
                    {value.value ? isoToEmoji(value.value) : 'Select country...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 pb-0" align="start">
                <Command>
                    <CommandInput placeholder={placeholder} className="h-9" />
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandList>
                        <CommandGroup className="mt-2 h-full max-h-48 overflow-auto p-0 [&_div[cmdk-group-items]]:flex [&_div[cmdk-group-items]]:flex-col [&_div[cmdk-group-items]]:gap-1">
                            {options.map((option) => {
                                const isSelected = value.value === option.value;

                                return (
                                    <CommandItem
                                        key={option.value}
                                        value={renderValue(option)}
                                        onSelect={() => {
                                            onValueChange(option);
                                            setOpen(false);
                                        }}
                                    >
                                        {renderOption({ option, isSelected: isSelected })}
                                        {isSelected ? (
                                            <Check className="ml-auto mr-2 h-4 w-4" />
                                        ) : null}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

import {
    type CountryCode,
    getCountries,
    getCountryCallingCode,
} from 'libphonenumber-js';
import { Controller } from 'react-hook-form';
import { Button } from './button';

/**
 * Source: https://grafikart.fr/tutoriels/drapeau-emoji-fonction-2152
 * @param code fr, en, de...
 * @returns the emoji flag (🇫🇷, 🇬🇧, 🇩🇪)
 */
export function isoToEmoji(code: string) {
    return code
        .split('')
        .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
        .map((emojiCode) => String.fromCodePoint(emojiCode))
        .join('');
}

/**
 * Get all countries options
 * @returns array of countries options
 *
 * @example
 * getCountriesOptions() // [{value: "DE", label: "Germany", indicatif: "+49"}, ...]
 */
function getCountriesOptions() {
    const countries = getCountries();

    // Type inference is not working here
    const options = countries
        .map((country) => ({
            value: country,
            label: i18nIsoCountries.getName(country.toUpperCase(), 'en', {
                select: 'official',
            }),
            indicatif: `+${getCountryCallingCode(country)}`,
        }))
        .filter((option) => option.label) as {
            value: CountryCode;
            label: string;
            indicatif: CountryCallingCode;
        }[];

    return options;
}
