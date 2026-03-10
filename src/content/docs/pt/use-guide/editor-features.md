---
title: Editor Features
description: Features of the ÆRIS code editor.
---

# Editor Features

The ÆRIS editor is where assembly programs are written and modified before execution.
It is built on top of **Monaco Editor**, the same editor engine used in Visual Studio Code.

The editor provides several features that make writing RISC-V assembly easier.

## Syntax Highlighting

The editor highlights:

- instructions
- registers
- directives
- labels
- numbers
- comments
- strings

Example:

```asm
addi t0, t1, 10
```

## Register Recognition

Registers can be written using either numeric names or ABI names.

Examples:

```asm
x10
a0
sp
ra
t0
```

## Directive Highlighting

Assembler directives are highlighted.

Examples:

```asm
.data
.text
.word
.ascii
.string
```

## Comments

Comments start with `#`.

Example:

```asm
addi t0, t1, 10 # increment register
```

## Numeric Literals

Supported numeric formats:

Decimal:

```asm
10
-5
```

Hexadecimal:

```asm
0xFF
0x10010000
```

## Labels

Labels define symbolic addresses.

Example:

```asm
loop:
    addi t0, t0, -1
    bnez t0, loop
```

## String Literals

Strings can be declared using directives.

Example:

```asm
.data
msg: .string "Hello RISC-V\n"
```

## Pseudo Instructions

The editor accepts pseudo-instructions.

Examples:

```asm
li a0, 10
mv t0, t1
nop
```

These are expanded during assembly into RV32I instructions.

## Editing Behavior

The editor supports standard editing features:

- cursor navigation
- multi-line editing
- selection
- copy and paste
- undo / redo

## File Operations

Programs can be loaded or saved as `.asm` files.

## Auto Save

The simulator can automatically save the editor contents locally in the browser.
