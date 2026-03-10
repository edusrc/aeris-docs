---
title: Project Structure
description: Overview of the ÆRIS repository structure.
---

# Project Structure

The ÆRIS repository is organized to separate **simulation logic**, **application logic**, and **user interface components**.  
Most of the core functionality lives in the `simulator/core` directory, which follows a clean architecture style.

The Angular framework is used only for the UI layer and application wiring.

---

## Top-Level Structure

```
aeris/
├── src/
│   ├── app/
│   │   ├── simulator/
│   │   │   ├── core/        # Simulation engine and business logic
│   │   │   └── features/    # Angular UI components
│   │   ├── app-module.ts
│   │   └── app.ts
│   ├── assets/
│   ├── styles/
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
```

The important code for the simulator is located under:

```
src/app/simulator/
```

---

# Core Layer

```
src/app/simulator/core/
```

This directory contains the **simulation engine and architecture logic**.  
It is mostly framework-independent TypeScript code.

```
core/
├── adapters/
├── application/
├── domain/
├── monaco/
├── pipes/
├── ports/
├── shared/
├── state/
└── theme/
```

---

## Adapters

```
core/adapters/
```

Adapters provide concrete implementations for interfaces defined in the ports layer.

Examples:

| Adapter | Purpose |
|-------|--------|
| `file-saver.adapter` | Save files to disk |
| `mat-snackbar.adapter` | UI notifications |
| `memory-console.adapter` | Console output buffer |
| `runtime-settings.adapter` | Settings persistence |
| `syscall.adapter` | Connect syscalls to UI |

Adapters allow the domain layer to remain independent from Angular.

---

## Application Layer

```
core/application/
```

The application layer contains **use cases** that coordinate domain logic.

```
application/
└── use-cases/
    ├── AssembleUseCase.ts
    ├── RunProgramUseCase.ts
    └── DumpUseCase.ts
```

Responsibilities include:

- assembling source code
- executing programs
- exporting assembled code
- coordinating the simulation state

---

## Domain Layer

```
core/domain/
```

This is the **heart of the simulator**.

It contains:

- assembler
- instruction encoders
- CPU simulation
- memory model
- register file
- syscall handling

```
domain/
├── analyzer/
├── assembler/
├── riscv/
├── shared/
└── simulation/
```

### Analyzer

Responsible for parsing and analyzing assembly code.

Key components:

- `Parser`
- `CodeAnalyzer`
- `DataSegmentBuilder`
- `TextSegmentBuilder`
- `PseudoExpander`
- `SymbolTable`

---

### Assembler

Encodes instructions into machine code.

```
assembler/
├── Assembler.ts
├── Validator.ts
└── encoder/
```

Encoders exist for each instruction format:

```
r.encoder.ts
i.encoder.ts
s.encoder.ts
b.encoder.ts
u.encoder.ts
j.encoder.ts
```

---

### RISC-V CPU Implementation

```
domain/riscv/
```

Implements the simulated processor.

```
riscv/
├── CPU.ts
├── CPUInitializer.ts
├── ExecutionEngine.ts
├── Instruction.ts
├── state/
│   ├── Memory.ts
│   ├── ProgramCounter.ts
│   └── RegisterFile.ts
├── syscall/
│   ├── SyscallHandler.ts
│   └── SyscallCodes.ts
└── units/
    ├── ALU.ts
    ├── Control.ts
    └── ImmediateGenerator.ts
```

This layer implements the **fetch → decode → execute** cycle.

---

### Simulation

```
domain/simulation/
```

Responsible for building and running simulations.

Main components:

- `SimulationBuilder`
- `SimulationRunner`

These coordinate CPU state initialization and execution.

---

# State Management

```
core/state/
```

The simulator uses a centralized store to manage application state.

```
state/
├── simulator.facade/
├── simulator.state/
└── simulator.store/
```

The store keeps track of:

- source code
- assembled program
- simulation state
- registers
- memory
- execution phase
- UI settings

State updates are propagated to the UI through reactive streams.

---

# Ports

```
core/ports/
```

Ports define interfaces used by the domain layer.

Examples:

```
console.port.ts
file.port.ts
notify.port.ts
settings.port.ts
syscall.port.ts
```

Adapters implement these interfaces to connect the simulation engine to external systems.

---

# UI Layer

```
src/app/simulator/features/
```

This directory contains all Angular UI components.

```
features/
└── simulator/
    ├── components/
    ├── dialogs/
    └── pages/
```

Components include:

| Component | Purpose |
|--------|--------|
| `editor` | Code editor |
| `console` | Program input/output |
| `exec` | Instruction execution viewer |
| `registers` | Register viewer |
| `runtime` | Runtime information |
| `menu` | Top-level controls |

Dialogs provide:

- settings
- help
- program dump

---

# Monaco Integration

```
core/monaco/
```

Contains Monaco editor configuration and syntax definitions for RISC-V assembly.

```
monaco/
├── monaco.config.ts
└── rv32i.ts
```

This module registers the custom language tokenizer used for syntax highlighting.

---

# Summary

The project structure is designed around clear separation of concerns:

| Layer | Responsibility |
|------|---------------|
| UI | Angular components and dialogs |
| Application | Use cases coordinating operations |
| Domain | Assembler and CPU simulation |
| Ports | Interfaces for external services |
| Adapters | Implementations connecting UI and domain |

This structure keeps the simulation engine independent from the framework and easier to maintain.
