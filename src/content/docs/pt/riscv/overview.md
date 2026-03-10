---
title: RISC-V Overview
description: Basic concepts of the RISC-V architecture relevant to the simulator.
---

# RISC-V Overview

RISC-V is an open standard **Instruction Set Architecture (ISA)** based on reduced instruction set computing (RISC) principles.  
It defines how software communicates with the processor through machine instructions, registers, and memory.

ÆRIS implements the **RV32I** base integer instruction set, which is the simplest and most widely used starting point for learning RISC-V.

---

## RISC vs CISC

RISC-V follows the **RISC philosophy**, which emphasizes:

- a small and simple instruction set
- fixed-length instructions
- simple addressing modes
- predictable execution

Compared to complex instruction set architectures (CISC), RISC designs aim to make hardware simpler and more efficient while relying on compilers and software to build complex behavior from simple instructions.

---

## RV32I

The simulator implements **RV32I**, which means:

| Property | Value |
|--------|------|
| Word size | 32 bits |
| Register width | 32 bits |
| Number of registers | 32 |
| Instruction width | 32 bits |
| Instruction set | Base integer instructions |

RV32I includes arithmetic operations, memory access, branches, jumps, and system calls.

---

## Register File

RISC-V defines **32 general-purpose registers**:

```
x0 – x31
```

Each register holds a **32-bit value**.

Register `x0` is special:

```
x0 = 0
```

It always reads as zero and ignores writes.

Many registers also have **ABI names** that indicate their conventional use.

| Register | ABI Name | Typical Use |
|--------|--------|-------------|
| x0 | zero | constant zero |
| x1 | ra | return address |
| x2 | sp | stack pointer |
| x3 | gp | global pointer |
| x4 | tp | thread pointer |
| x5–x7 | t0–t2 | temporaries |
| x8–x9 | s0–s1 | saved registers |
| x10–x17 | a0–a7 | function arguments |
| x18–x27 | s2–s11 | saved registers |
| x28–x31 | t3–t6 | temporaries |

---

## Instruction Format

All RV32I instructions are **32 bits long**, but their internal layout depends on the instruction format.

The main formats are:

| Format | Purpose |
|------|--------|
| R-type | register arithmetic |
| I-type | immediate arithmetic and loads |
| S-type | stores |
| B-type | conditional branches |
| U-type | upper immediate |
| J-type | jumps |

Each format places operands and immediates in different bit positions within the 32‑bit instruction word.

---

## Program Counter

The **Program Counter (PC)** stores the address of the current instruction.

Normally:

```
PC = PC + 4
```

because instructions are 4 bytes long.

Branches and jumps modify the PC to implement control flow.

---

## Memory Model

RISC-V uses a **byte-addressable memory** model.

Key characteristics:

- memory addresses refer to bytes
- words are 4 bytes
- little-endian byte order

Common operations include:

| Operation | Description |
|----------|-------------|
| `lb` | load byte |
| `lh` | load halfword |
| `lw` | load word |
| `sb` | store byte |
| `sh` | store halfword |
| `sw` | store word |

---

## Control Flow

Programs control execution using **branches** and **jumps**.

Branch instructions compare two registers and change the PC when the condition is true.

Examples:

```
beq
bne
blt
bge
```

Jump instructions unconditionally transfer control to another address.

Examples:

```
jal
jalr
```

---

## System Calls

The `ecall` instruction allows programs to request services from the environment.

In ÆRIS, syscalls are used to interact with the console.

Example:

```
li a7, 1
li a0, 42
ecall
```

This prints the integer stored in `a0`.

---

## Why RISC-V is Popular in Education

RISC-V has become widely used in computer architecture courses because:

- the ISA specification is open and freely available
- the instruction set is small and easy to understand
- the architecture is modular and extensible

This makes it ideal for simulators and teaching tools such as ÆRIS.
