---
title: Simulation Engine
description: How instruction execution works internally in ÆRIS.
---

# Simulation Engine

This section explains how ÆRIS executes a RISC‑V program internally, from assembled instructions to step‑by‑step CPU execution.

The simulation engine is implemented inside the **domain layer** and models a simplified RV32I processor. Its main components are:

- `CPU`
- `ExecutionEngine`
- `RegisterFile`
- `Memory`
- `ProgramCounter`
- `ALU`
- `ImmediateGenerator`
- `Control`
- `SyscallHandler`

Together these components implement a classical **fetch → decode → execute → writeback** cycle.

---

## Execution Flow

When the user runs or steps a program, the following high‑level flow occurs:

1. The assembled program is loaded into memory
2. The CPU state is initialized (registers, PC, memory)
3. The execution engine repeatedly performs **CPU steps**
4. Each step fetches and executes exactly one instruction

```
Assembled Program
        │
        ▼
 CPUInitializer
        │
        ▼
 ExecutionEngine
        │
        ▼
      CPU.step()
        │
        ▼
Fetch → Decode → Execute → Writeback → Update PC
```

The UI updates after each step using the state returned by the simulation engine.

---

## CPU State

The CPU maintains three main parts of machine state.

### Registers

Implemented in:

```
core/domain/riscv/state/RegisterFile.ts
```

The register file contains **32 general‑purpose registers**:

```
x0 – x31
```

Characteristics:

- 32‑bit signed integers
- stored in an `Int32Array`
- register **x0 always reads as 0**
- writes to x0 are ignored

Registers are accessed through simple read/write operations:

```
read(index)
write(index, value)
```

---

### Program Counter

Implemented in:

```
core/domain/riscv/state/ProgramCounter.ts
```

The program counter (PC) holds the address of the **current instruction**.

After each instruction:

```
PC = PC + 4
```

unless the instruction changes control flow (branch or jump).

---

### Memory

Implemented in:

```
core/domain/riscv/state/Memory.ts
```

Memory is implemented as a **sparse map** that stores only addresses that have been written.

Properties:

- little‑endian layout
- byte, halfword, and word operations
- word‑aligned instruction memory

Supported operations include:

```
readI8 / writeU8
readI16 / writeU16
readWord / writeWord
```

---

## Instruction Execution

The core of the simulator is the `CPU.step()` method.

Each step executes exactly **one instruction**.

### 1. Fetch

The CPU reads the 32‑bit instruction word from memory using the current PC.

```
instruction = memory.readWord(pc)
```

---

### 2. Decode

The instruction fields are extracted from the 32‑bit word:

```
opcode
rd
rs1
rs2
funct3
funct7
```

These fields determine:

- instruction format
- ALU operation
- control signals
- memory access type

The **Control Unit** interprets the instruction and produces the signals required for execution.

---

### 3. Read Registers

Source registers are read from the register file.

```
value1 = registers.read(rs1)
value2 = registers.read(rs2)
```

---

### 4. Immediate Generation

If the instruction uses an immediate value, it is extracted by the **ImmediateGenerator**.

Different formats exist depending on instruction type:

- I‑type
- S‑type
- B‑type
- U‑type
- J‑type

The immediate is sign‑extended to 32 bits when necessary.

---

### 5. Execute (ALU)

The **ALU** performs the required operation using its inputs.

Typical operations include:

```
ADD
SUB
AND
OR
XOR
SLL
SRL
SRA
SLT
SLTU
```

Inputs may come from:

- registers
- immediate values
- the program counter

depending on the control signals.

---

### 6. Memory Access

If the instruction is a load or store, memory is accessed.

Loads:

```
LB
LH
LW
LBU
LHU
```

Stores:

```
SB
SH
SW
```

The memory address is normally produced by the ALU.

---

### 7. Write Back

Results are written back to the destination register (`rd`).

Possible sources of the writeback value:

- ALU result
- loaded memory value
- `PC + 4` (for jumps)
- immediate value (LUI)

---

### 8. Update PC

The program counter is updated according to instruction type.

Default behavior:

```
PC = PC + 4
```

Branch instructions modify PC when their condition is satisfied.

Jump instructions set PC to the computed target address.

---

## Execution Engine

Implemented in:

```
core/domain/riscv/ExecutionEngine.ts
```

The execution engine coordinates program execution.

Responsibilities:

- repeatedly call `CPU.step()`
- detect program termination
- return execution state to the application layer
- support **step execution** and **run‑to‑completion** modes

---

## Syscalls

System calls are triggered by the `ecall` instruction.

Handled by:

```
core/domain/riscv/syscall/SyscallHandler.ts
```

The syscall code is read from register `a7`.

Common syscalls supported by the simulator:

| Code | Action |
|-----|------|
| 1 | Print integer |
| 4 | Print string |
| 5 | Read integer |
| 8 | Read string |

The handler returns a **SyscallEffect** describing the action to perform.  
The actual input/output is implemented by adapters in the application layer.

---

## State Mutation Tracking

After every step the CPU reports what changed in the machine state.

Typical information includes:

- register written
- memory address modified
- previous PC
- next PC
- syscall activity

This information is used by the UI to highlight:

- modified registers
- modified memory cells
- current instruction location.

---

## Program Termination

Execution stops when:

- the PC leaves the text segment
- a runtime error occurs
- the user stops execution manually

When termination occurs the simulator enters the **halted state** and execution controls are disabled.

---

## Design Goals

The simulation engine prioritizes:

- **clarity** — instructions are executed in explicit steps
- **correctness** — behavior matches the RV32I specification
- **observability** — internal state is always visible to the UI
- **modularity** — CPU, memory, and assembler are independent components

This design makes the simulator easier to understand, test, and extend.
