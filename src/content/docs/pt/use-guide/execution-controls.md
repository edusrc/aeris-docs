---
title: Execution Controls
description: Controls used to assemble, run, and debug programs in ÆRIS.
---

# Execution Controls

The execution controls allow users to assemble programs and control how they run inside the simulator.

These controls make it possible to observe program behavior either continuously or one instruction at a time.

---

## Assemble

The **Assemble** action parses the assembly program and converts it into machine instructions.

During this process the simulator:

- parses the source code
- resolves labels
- expands pseudo-instructions
- encodes instructions into 32-bit machine code
- loads instructions and data into memory

If errors are found during assembly, execution will not start and the error will be reported to the user.

---

## Run

The **Run** action executes the program continuously until one of the following occurs:

- the program finishes execution
- a syscall terminates the program
- execution is manually stopped
- an error occurs

While running, the simulator updates registers, memory, and the program counter as instructions execute.

---

## Step

The **Step** action executes exactly **one instruction**.

After the instruction executes, the simulator pauses and updates the processor state.

This allows users to carefully observe how each instruction affects:

- registers
- memory
- the program counter

Step execution is useful for learning how assembly instructions work.

---

## Undo

The **Undo** action reverts the most recently executed instruction.

This restores the previous processor state, including:

- register values
- memory changes
- program counter

Undo makes it possible to step backwards when analyzing program behavior.

---

## Reset

The **Reset** action restores the simulator to the state immediately after assembly.

This includes:

- resetting the program counter
- restoring registers to their initial values
- reloading memory contents
- clearing runtime state

Reset allows the program to be executed again from the beginning without reassembling the code.

---

## Execution Flow

A typical execution workflow in ÆRIS looks like this:

1. Write or load a program in the editor
2. Click **Assemble**
3. Run the program using **Run** or **Step**
4. Inspect registers, memory, and console output during execution
5. Use **Undo** or **Reset** if needed

These controls allow users to interactively explore how RISC-V programs execute.