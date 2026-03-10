---
title: Pseudo Instructions
description: Pseudo-instructions supported by the ÆRIS simulator.
---

# Pseudo Instructions

Pseudo-instructions are **syntactic shortcuts** that make assembly programs easier to read and write.  
They are **not real hardware instructions** in the RISC‑V ISA.

During assembly, each pseudo-instruction is automatically **expanded into one or more real RV32I instructions** before machine code is generated.

The simulator performs this expansion during the **analysis phase** using the `PseudoExpander` component.

---

# Why Pseudo Instructions Exist

The base RISC‑V instruction set is intentionally minimal.  
Many common operations can be expressed using existing instructions, but the syntax would be verbose.

Pseudo-instructions provide convenient aliases for these patterns.

Example:

```
mv t0, t1
```

is easier to read than:

```
addi t0, t1, 0
```

Both produce the same machine instruction.

---

# Common Pseudo Instructions

## Data Movement

| Pseudo | Expansion | Description |
|------|-----------|-------------|
| `mv rd, rs` | `addi rd, rs, 0` | Copy register |
| `nop` | `addi x0, x0, 0` | No operation |
| `not rd, rs` | `xori rd, rs, -1` | Bitwise NOT |

Example:

```asm
mv t0, t1
```

---

# Immediate Loading

Loading arbitrary constants often requires multiple instructions.  
Pseudo-instructions hide this complexity.

| Pseudo | Expansion |
|------|-----------|
| `li rd, imm` | `addi rd, x0, imm` (small immediates) |
| `li rd, imm` | `lui + addi` (large immediates) |

Example:

```asm
li t0, 100
```

For large values:

```asm
li t0, 0x12345678
```

This may expand to:

```
lui  t0, 0x12345
addi t0, t0, 0x678
```

---

# Address Loading

Addresses of labels are loaded using `la`.

| Pseudo | Expansion |
|------|-----------|
| `la rd, label` | `auipc rd, hi(label)` + `addi rd, rd, lo(label)` |

Example:

```asm
la a0, message
```

This loads the memory address of `message` into register `a0`.

---

# Unconditional Jumps

These pseudo-instructions simplify jump syntax.

| Pseudo | Expansion |
|------|-----------|
| `j label` | `jal x0, label` |
| `jr rs` | `jalr x0, rs, 0` |
| `ret` | `jalr x0, ra, 0` |

Example:

```asm
j loop
```

---

# Branch on Zero

These instructions compare a register with zero.

| Pseudo | Expansion |
|------|-----------|
| `beqz rs, label` | `beq rs, x0, label` |
| `bnez rs, label` | `bne rs, x0, label` |
| `bltz rs, label` | `blt rs, x0, label` |
| `bgez rs, label` | `bge rs, x0, label` |

Example:

```asm
bnez t0, loop
```

---

# Reversed Comparisons

Some comparisons are implemented by reversing operands.

| Pseudo | Expansion |
|------|-----------|
| `bgt rs, rt, label` | `blt rt, rs, label` |
| `ble rs, rt, label` | `bge rt, rs, label` |
| `bgtu rs, rt, label` | `bltu rt, rs, label` |
| `bleu rs, rt, label` | `bgeu rt, rs, label` |

Example:

```asm
bgt t0, t1, greater
```

---

# Set Instructions

These pseudo-instructions produce boolean values.

| Pseudo | Expansion |
|------|-----------|
| `seqz rd, rs` | `sltiu rd, rs, 1` |
| `snez rd, rs` | `sltu rd, x0, rs` |
| `sltz rd, rs` | `slt rd, rs, x0` |
| `sgtz rd, rs` | `slt rd, x0, rs` |

Example:

```asm
seqz t0, t1
```

Sets `t0` to `1` if `t1` is zero.

---

# Expansion Process in ÆRIS

Pseudo-instructions are expanded during the **text segment analysis stage**.

Pipeline:

```
Parser
   ↓
CodeAnalyzer
   ↓
TextSegmentBuilder
   ↓
PseudoExpander
   ↓
Assembler
```

After expansion, only **real RV32I instructions** remain.  
These are then encoded into machine code.

---

# Important Notes

- Pseudo-instructions **do not exist in hardware**
- They are purely an **assembler feature**
- One pseudo-instruction may expand into **multiple real instructions**
- The simulator displays the expanded instructions during execution
