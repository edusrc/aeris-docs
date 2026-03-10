---
title: User Interface
description: Overview of the ÆRIS simulator interface.
---

# User Interface

The ÆRIS interface is designed to provide a clear view of how a program executes on a RISC-V processor.  
It combines a code editor with several panels that display the current state of the simulated machine.

The interface is organized into a few main areas that work together during program execution.

## Editor

The editor is where assembly programs are written or loaded.

It supports syntax highlighting for RISC-V assembly and allows users to edit code directly in the browser. Programs can be written from scratch or opened from existing `.asm` files.

When the code is assembled, the instructions in the editor are parsed and converted into machine instructions used by the simulator.

## Execution Controls

Execution controls allow the user to manage the lifecycle of a program.

Typical actions include:

| Action | Description |
|------|------|
| **Assemble** | Parses and assembles the program into machine instructions. |
| **Run** | Executes the program continuously until it finishes. |
| **Step** | Executes a single instruction and pauses. |
| **Reset** | Restores the simulator to the initial state after assembly. |
| **Undo** | Reverts the last executed instruction. |

These controls make it possible to observe program behavior at different levels of detail.

## Registers Panel

The registers panel displays the state of the processor's register file.

All **32 RISC-V general-purpose registers** are shown along with their ABI names.  
The panel updates automatically after each instruction execution.

This allows users to observe how instructions modify register values during execution.

## Memory Panel

The memory panel provides a view of the simulator's memory.

Different regions of memory can be inspected, including:

- the **text segment** (program instructions)
- the **data segment**
- the **stack**
- other memory areas used during execution

Memory values can typically be viewed in multiple formats such as hexadecimal or decimal.

## Console

The console is used for program input and output.

Programs interact with the console through **syscalls**, which allow them to:

- print integers
- print strings
- read user input

Any output generated during program execution is displayed in the console panel.

## Runtime Information

The runtime section provides information about the current execution state.

It may display values such as:

- the **program counter (PC)**
- execution status (running, paused, finished)
- instruction execution progress

This information helps users track where the program is currently executing.

## Interface Layout

Although the exact layout may vary depending on screen size, the interface generally consists of:

- the **editor** on one side of the screen
- **execution controls** at the top
- **state panels** (registers, memory, console) alongside or below the editor

This layout allows users to write code and observe the resulting machine state at the same time.    