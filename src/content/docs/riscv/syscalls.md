---
title: Syscalls
description: How system calls (ecall) work in the ÆRIS simulator.
---

# Syscalls (ecall)

In RISC‑V, **system calls** allow a program to request services from the environment.  
This is done using the `ecall` instruction.

In real operating systems, `ecall` switches the processor from user mode to the operating system kernel.  
In ÆRIS, `ecall` is simulated and used mainly for **console input and output**.

---

# How `ecall` Works

A syscall is performed in three steps:

1. Place the **syscall number** in register `a7`
2. Place the **arguments** in registers (`a0`, `a1`, ...)
3. Execute the `ecall` instruction

Example:

```asm
li a7, 1
li a0, 42
ecall
```

This prints the integer `42` to the simulator console.

---

# Internal Handling in ÆRIS

When the CPU executes `ecall`, the simulation engine does not treat it as a normal instruction.

Instead:

1. The CPU detects the `ecall` opcode
2. Control is passed to the **SyscallHandler**
3. The handler reads registers (`a7`, `a0`, `a1`)
4. A syscall effect is produced
5. The adapter layer performs the actual I/O

Relevant files in the project:

```
core/domain/riscv/syscall/SyscallHandler.ts
core/domain/riscv/syscall/SyscallCodes.ts
core/adapters/syscall.adapter.ts
```

---

# Supported Syscalls

The simulator implements a small subset of common educational syscalls.

| Code | Name | Description |
|-----|------|-------------|
| 1 | PrintInt | Print the integer in `a0` |
| 4 | PrintString | Print the string at address `a0` |
| 5 | ReadInt | Read an integer from the console |
| 8 | ReadString | Read a string from the console |

---

# Print Integer

Prints the integer stored in register `a0`.

Example:

```asm
li a7, 1
li a0, 123
ecall
```

Output:

```
123
```

---

# Print String

Prints a null‑terminated string located in memory.

Example:

```asm
.data
msg: .string "Hello RISC-V\n"

.text
main:
    li a7, 4
    la a0, msg
    ecall
```

The simulator reads bytes from memory starting at `a0` until it encounters a `\0` terminator.

---

# Read Integer

Requests an integer from the user.

Example:

```asm
li a7, 5
ecall
```

Behavior:

1. The simulator pauses execution
2. The console shows an input field
3. The user enters a number
4. The value is written into register `a0`

---

# Read String

Reads a string from the console and writes it to memory.

Arguments:

| Register | Meaning |
|--------|--------|
| `a0` | buffer address |
| `a1` | maximum length |

Example:

```asm
li a7, 8
la a0, buffer
li a1, 32
ecall
```

The simulator writes the entered characters into memory starting at the address stored in `a0`.

---

# Execution Flow

When `ecall` executes, the CPU step roughly follows this logic:

```
if instruction == ECALL:
    code = registers[a7]
    args = registers[a0], registers[a1]
    effect = SyscallHandler.handle(code, args)
    adapters.execute(effect)
```

After the syscall completes, execution continues with the next instruction.

---

# Important Notes

- `ecall` **does not change privilege levels** in the simulator
- Only a **small subset of syscalls** is implemented
- Console I/O is handled by the **adapter layer**
- Execution may pause while waiting for user input

These syscalls are sufficient for writing interactive programs inside the simulator.
