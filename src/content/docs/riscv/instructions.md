---
title: Instruction Reference
description: Instructions supported by the ÆRIS simulator.
---

# Instruction Reference

ÆRIS implements the **RV32I base integer instruction set**.  
This page summarizes the instructions supported by the simulator and their behavior.

All instructions operate on **32-bit registers** and **byte-addressable memory**.

---

# Arithmetic Instructions

These instructions perform arithmetic operations between registers.

| Instruction | Description |
|-------------|-------------|
| `add rd, rs1, rs2` | rd = rs1 + rs2 |
| `sub rd, rs1, rs2` | rd = rs1 − rs2 |
| `sll rd, rs1, rs2` | Shift left logical |
| `srl rd, rs1, rs2` | Shift right logical |
| `sra rd, rs1, rs2` | Shift right arithmetic |
| `slt rd, rs1, rs2` | Set if less than (signed) |
| `sltu rd, rs1, rs2` | Set if less than (unsigned) |

Example:

```asm
add t0, t1, t2
```

---

# Immediate Arithmetic

Immediate instructions use a constant value instead of a second register.

| Instruction | Description |
|-------------|-------------|
| `addi rd, rs1, imm` | rd = rs1 + imm |
| `andi rd, rs1, imm` | rd = rs1 AND imm |
| `ori rd, rs1, imm` | rd = rs1 OR imm |
| `xori rd, rs1, imm` | rd = rs1 XOR imm |
| `slti rd, rs1, imm` | Set if rs1 < imm |
| `sltiu rd, rs1, imm` | Unsigned comparison |

Example:

```asm
addi t0, t0, 1
```

---

# Load Instructions

Load instructions read data from memory into registers.

| Instruction | Description |
|-------------|-------------|
| `lb rd, offset(rs1)` | Load byte |
| `lh rd, offset(rs1)` | Load halfword |
| `lw rd, offset(rs1)` | Load word |
| `lbu rd, offset(rs1)` | Load byte (unsigned) |
| `lhu rd, offset(rs1)` | Load halfword (unsigned) |

Example:

```asm
lw t0, 0(sp)
```

---

# Store Instructions

Store instructions write register values to memory.

| Instruction | Description |
|-------------|-------------|
| `sb rs2, offset(rs1)` | Store byte |
| `sh rs2, offset(rs1)` | Store halfword |
| `sw rs2, offset(rs1)` | Store word |

Example:

```asm
sw t0, 4(sp)
```

---

# Branch Instructions

Branches change control flow based on a condition.

| Instruction | Condition |
|-------------|-----------|
| `beq rs1, rs2, label` | branch if equal |
| `bne rs1, rs2, label` | branch if not equal |
| `blt rs1, rs2, label` | branch if less than |
| `bge rs1, rs2, label` | branch if greater or equal |
| `bltu rs1, rs2, label` | unsigned less than |
| `bgeu rs1, rs2, label` | unsigned greater or equal |

Example:

```asm
beq t0, t1, loop
```

---

# Jump Instructions

Jump instructions modify the program counter unconditionally.

| Instruction | Description |
|-------------|-------------|
| `jal rd, label` | Jump and link |
| `jalr rd, rs1, imm` | Jump to register |

Example:

```asm
jal ra, function
```

---

# Upper Immediate Instructions

These instructions load large constants.

| Instruction | Description |
|-------------|-------------|
| `lui rd, imm` | Load upper immediate |
| `auipc rd, imm` | Add upper immediate to PC |

Example:

```asm
lui t0, 0x10010
```

---

# System Instruction

The system instruction supported by the simulator is:

| Instruction | Description |
|-------------|-------------|
| `ecall` | Perform a system call |

The syscall number is stored in register `a7`.

Example:

```asm
li a7, 1
li a0, 42
ecall
```

This prints the integer `42` to the console.

---

# Pseudo Instructions

The simulator also supports several **pseudo-instructions** that are expanded by the assembler.

Examples:

| Pseudo | Expansion |
|------|-----------|
| `nop` | `addi x0, x0, 0` |
| `mv rd, rs` | `addi rd, rs, 0` |
| `li rd, imm` | load immediate |
| `j label` | `jal x0, label` |
| `ret` | `jalr x0, ra, 0` |

Pseudo-instructions simplify writing assembly programs but are converted to real instructions during assembly.

---

# Notes

- All instructions are **32 bits long**
- The program counter normally increases by **4 bytes**
- Register `x0` always contains **0**
- Memory is **little-endian**

The simulator follows the behavior defined by the **RV32I specification**, making it suitable for learning and experimenting with RISC-V assembly.
