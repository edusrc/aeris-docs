---
title: Console
description: Console input and output in the ÆRIS simulator.
---

# Console

The console provides input and output capabilities for programs running in the simulator.
It is used by programs to display text or numbers and to receive input from the user through system calls.

The console behaves similarly to a simple terminal connected to the simulated processor.

## Program Output

Programs can print data to the console using supported syscalls.

Common operations include:

- printing integers
- printing strings
- printing characters

Example:

```asm
li a7, 1
li a0, 42
ecall
```

This syscall prints the integer stored in register `a0`.

## Printing Strings

Strings stored in memory can also be printed.

Example:

```asm
.data
msg: .string "Hello RISC-V\n"

.text
la a0, msg
li a7, 4
ecall
```

This prints the string stored at the memory address referenced by `msg`.

## User Input

Some syscalls allow programs to read input from the console.

Example:

```asm
li a7, 5
ecall
```

This syscall waits for the user to enter an integer and stores the result in register `a0`.

## Execution Feedback

The console also shows runtime information generated during program execution, including:

- program output
- user input
- error messages
- execution messages

This makes it easier to understand how the program interacts with the runtime environment.

## Clearing the Console

The console can be cleared manually to remove previous output and start with a clean view.

This is useful when running a program multiple times or when testing different inputs.

## Console Behavior

The console updates automatically as the program executes.
When a program requests input, execution pauses until the user provides the requested value.

All console interactions occur through syscalls executed by the simulated processor.
