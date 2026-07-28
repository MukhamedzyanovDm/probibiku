import * as React from "react";

import { cn } from "./utils";

// Единая шкала типографики личного кабинета (гараж/дашборд).
// Каждому уровню намеренно закреплена ровно одна пара размер и начертание —
// не смешивать с сырыми классами text- и font- напрямую в новых местах ЛК.

function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-title"
      className={cn("text-2xl md:text-3xl font-semibold tracking-tight text-slate-950", className)}
      {...props}
    />
  );
}

function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="section-title"
      className={cn("text-base font-medium text-slate-900", className)}
      {...props}
    />
  );
}

function KpiValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kpi-value"
      className={cn("text-2xl md:text-3xl font-semibold tabular-nums text-slate-950", className)}
      {...props}
    />
  );
}

function BodyText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="body-text"
      className={cn("text-sm font-normal text-slate-600", className)}
      {...props}
    />
  );
}

function MutedText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="muted-text"
      className={cn("text-sm font-normal text-slate-500", className)}
      {...props}
    />
  );
}

function MetaLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="meta-label"
      className={cn("text-xs font-medium text-slate-500", className)}
      {...props}
    />
  );
}

function MicroLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="micro-label"
      className={cn("text-2xs font-medium tracking-wide text-slate-500", className)}
      {...props}
    />
  );
}

export {
  PageTitle,
  SectionTitle,
  KpiValue,
  BodyText,
  MutedText,
  MetaLabel,
  MicroLabel,
};
