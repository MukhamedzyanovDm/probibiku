"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { ChevronDown } from "lucide-react";
import { cn } from "@/components/ui/utils";

export interface ComboboxOption {
  value: string;
  keywords?: string[];
}

export interface ComboboxHandle {
  focus: () => void;
}

interface ComboboxProps {
  name?: string;
  ariaLabel?: string;
  options: ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  onSelectOption?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  error?: boolean;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const Combobox = React.forwardRef<ComboboxHandle, ComboboxProps>(function Combobox(
  {
    name,
    ariaLabel,
    options,
    value,
    onValueChange,
    onSelectOption,
    placeholder,
    emptyText = "Ничего не найдено. Можно ввести значение вручную.",
    error,
    className,
    disabled,
    autoFocus,
  },
  ref,
) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  React.useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const showList = open && options.length > 0;

  return (
    <CommandPrimitive shouldFilter={options.length > 0} className="overflow-visible">
      <div ref={containerRef} className="relative">
        <div className="relative">
          <CommandPrimitive.Input
            ref={inputRef}
            name={name}
            aria-label={ariaLabel}
            value={value}
            onValueChange={onValueChange}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full text-base sm:text-sm border rounded-xl pl-3.5 pr-9 py-2.5 bg-slate-50/50 focus:bg-white outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500",
              className,
            )}
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {showList && (
          <div className="absolute z-20 mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-1 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)]">
            <CommandPrimitive.List className="max-h-56 overflow-y-auto">
              <CommandPrimitive.Empty className="py-3 px-2 text-xs text-slate-400 font-normal">
                {emptyText}
              </CommandPrimitive.Empty>
              {options.map((option) => (
                <CommandPrimitive.Item
                  key={option.value}
                  value={option.value}
                  keywords={option.keywords}
                  onSelect={() => {
                    onValueChange(option.value);
                    onSelectOption?.(option.value);
                    setOpen(false);
                    inputRef.current?.blur();
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-normal text-slate-700 cursor-pointer data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-700"
                >
                  {option.value}
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.List>
          </div>
        )}
      </div>
    </CommandPrimitive>
  );
});
