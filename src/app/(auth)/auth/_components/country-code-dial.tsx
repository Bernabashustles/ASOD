"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";

type CountryCodeDialProps = {
    countryCode: string;
    phoneNumber: string;
    onCountryCodeChange: (value: string) => void;
    onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CountryCodeDial({
    countryCode,
    phoneNumber,
    onCountryCodeChange,
    onPhoneNumberChange,
}: CountryCodeDialProps) {
    const [open, setOpen] = useState(false);


    const countries = getCountries();

    const getCountryISO = (countryCode: string) => {
        return (
            countries.find((c) => `+${getCountryCallingCode(c)}` === countryCode) ||
            "XX"
        );
    };


    const getCountryName = (countryCode: string) => {
        const country = countries.find(
            (c) => `+${getCountryCallingCode(c)}` === countryCode,
        );
        return country ? en[country] : "Unknown";
    };

    const FlagIcon = ({
        countryCode,
        className = "",
    }: { countryCode: string; className?: string }) => {
        const isoCode = getCountryISO(countryCode);
        return (
            <ReactCountryFlag
                countryCode={isoCode}
                svg
                style={{
                    width: "1.25rem",
                    height: "0.9375rem",
                }}
                className={`inline-block rounded-sm ${className}`}
                title={getCountryName(countryCode)}
            />
        );
    };

    const allCountriesWithCodes = countries
        .map((country) => ({
            code: `+${getCountryCallingCode(country)}`,
            name: en[country] || country,
            country: country,
            isoCode: country,
            searchText:
                `${en[country] || country} +${getCountryCallingCode(country)}`.toLowerCase(),
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

        .filter(
            (country, index, array) =>
                index === array.findIndex((c) => c.code === country.code),
        );

    const popularCountryCodes = [
        "+251",
        "+44",
        "+91",
        "+86",
        "+81",
        "+49",
        "+33",
        "+39",
        "+7",
        "+55",
    ];

    const popularCountries = popularCountryCodes
        .map((code) => allCountriesWithCodes.find((c) => c.code === code))
        .filter(
            (country): country is NonNullable<typeof country> =>
                country !== undefined,
        );

    const otherCountries = allCountriesWithCodes.filter(
        (country) => !popularCountryCodes.includes(country.code),
    );

    const selectedCountry = allCountriesWithCodes.find(
        (c) => c.code === countryCode,
    );

    return (
        <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        aria-expanded={open}
                        className="h-[52px] w-[120px] justify-between rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-3 hover:border-white/30 hover:bg-white/8 focus:border-white/80 focus:outline-none focus:ring-4 focus:ring-white/10 text-white transition-all duration-200"
                    >
                        {selectedCountry ? (
                            <div className="flex items-center gap-2">
                                <FlagIcon countryCode={selectedCountry.code} />
                                <span className="font-medium text-sm text-white">
                                    {selectedCountry.code}
                                </span>
                            </div>
                        ) : (
                            <span className="text-white/60">Select...</span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-white/60" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg" align="start">
                    <Command className="bg-transparent">
                        <CommandInput
                            placeholder="Search country..."
                            className="h-9 border-none bg-transparent text-white placeholder:text-white/40 focus:ring-0"
                        />
                        <CommandList className="bg-transparent">
                            <CommandEmpty className="text-white/60 text-center py-4">No country found.</CommandEmpty>

                            {popularCountries.length > 0 && (
                                <CommandGroup heading="Popular" className="text-white/70 [&_[cmdk-group-heading]]:text-white/70 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                                    {popularCountries.map((country) => (
                                        <CommandItem
                                            key={`popular-${country.code}`}
                                            value={country.searchText}
                                            onSelect={() => {
                                                onCountryCodeChange(country.code);
                                                setOpen(false);
                                            }}
                                            className="cursor-pointer px-2 py-2 hover:bg-white/10 text-white aria-selected:bg-white/10 data-[selected=true]:bg-white/10"
                                        >
                                            <div className="flex w-full items-center gap-3">
                                                <FlagIcon countryCode={country.code} />
                                                <span className="min-w-[2.5rem] font-medium text-sm text-white">
                                                    {country.code}
                                                </span>
                                                <span className="flex-1 truncate text-white/70 text-sm">
                                                    {country.name}
                                                </span>
                                                <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4 text-white",
                                                        countryCode === country.code
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}

                            <CommandGroup heading="All Countries" className="text-white/70 [&_[cmdk-group-heading]]:text-white/70 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                                {otherCountries.map((country) => (
                                    <CommandItem
                                        key={country.code}
                                        value={country.searchText}
                                        onSelect={() => {
                                            onCountryCodeChange(country.code);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer px-2 py-2 hover:bg-white/10 text-white aria-selected:bg-white/10 data-[selected=true]:bg-white/10"
                                    >
                                        <div className="flex w-full items-center gap-3">
                                            <FlagIcon countryCode={country.code} />
                                            <span className="min-w-[2.5rem] font-medium text-sm text-white">
                                                {country.code}
                                            </span>
                                            <span className="flex-1 truncate text-white/70 text-sm">
                                                {country.name}
                                            </span>
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4 text-white",
                                                    countryCode === country.code
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="relative flex-1">
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={onPhoneNumberChange}
                    placeholder="Enter phone number"
                    className="w-full px-5 py-4 border-2 border-white/20 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-200 h-[52px] font-[0.9375rem] text-white placeholder:text-white/40 hover:border-white/30 hover:bg-white/8 focus:border-white/80 focus:outline-none focus:ring-4 focus:ring-white/10 focus:bg-white/10"
                    autoComplete="tel"
                    maxLength={15}
                />
            </div>
        </div>
    );
}