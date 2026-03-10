---
title: RV32I
description: Details about the RV32I base integer instruction set supported by ÆRIS.
---

# RV32I

ÆRIS implements the **RV32I** base integer instruction set.  
RV32I is the minimal RISC-V ISA that defines integer computation, memory access, and control flow instructions.

It is the standard starting point for learning RISC-V and forms the foundation for all other extensions.

---

## Basic Properties

| Property | Value |
|--------|------|
| ISA | RV32I |
| Word size | 32 bits |
| Register count | 32 |
| Instruction length | 32 bits |
| Endianness | Little-endian |

All instructions are **fixed width (4 bytes)**, which simplifies decoding and execution.

---

## Registers

RV32I provides **32 general-purpose registers**:

```
x0 – x31
```

Each register stores a **32‑bit signed integer**.

Register `x0` is special:

```
x0 = 0
```

It always reads as zero and ignores writes.

Most programs use the ABI register names instead of numeric indices.

Example:

```
a0  → x10
sp  → x2
ra  → x1
t0  → x5
```

---

## Instruction Categories

The RV32I instruction set can be divided into several categories.

### Arithmetic and Logic

These instructions operate on register values.

Examples:

```
add
sub
and
or
xor
sll
srl
sra
slt
sltu
```

Immediate variants also exist:

```
addi
andi
ori
xori
slti
sltiu
```

---

### Memory Instructions

Memory operations move data between registers and memory.

Loads:

```
lb
lh
lw
lbu
lhu
```

Stores:

```
sb
sh
sw
```

Example:

```
lw t0, 0(sp)
sw t1, 4(sp)
```

---

### Control Flow

Branch instructions change control flow depending on a condition.

Examples:

```
beq
bne
blt
bge
bltu
bgeu
```

Jump instructions transfer control unconditionally.

Examples:

```
jal
jalr
```

---

### Upper Immediate

Two instructions load large immediates.

```
lui
auipc
```

These instructions place a 20‑bit immediate into the upper portion of a register.

---

### System Instruction

```
ecall
```

This instruction triggers a **system call**.

In ÆRIS, syscalls are used for console input and output.

---

## Instruction Formats

RV32I instructions follow six formats:

| Format | Purpose |
|------|--------|
| R | register arithmetic |
| I | immediate arithmetic and loads |
| S | stores |
| B | branches |
| U | upper immediates |
| J | jumps |

Each format places operands and immediate values in different bit fields within the 32‑bit instruction.

---

## Example Program

Example RV32I program that adds two numbers and prints the result.

```asm
.text
main:
    li t0, 10
    li t1, 20

    add t2, t0, t1

    li a7, 1
    mv a0, t2
    ecall
```

Steps performed:

1. Load values into registers
2. Add them using `add`
3. Print the result using a syscall

---

## RV32I in ÆRIS

The simulator supports all base RV32I instructions along with pseudo‑instructions expanded by the assembler.

The simulation engine executes instructions exactly as defined by the RV32I specification, allowing users to observe:

- register changes
- memory operations
- control flow
- program counter updates

This makes ÆRIS suitable for studying the fundamentals of the RISC-V architecture.
