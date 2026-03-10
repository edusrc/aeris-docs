---
title: Introduction
---

# ÆRIS - Advanced Educational RISC-V Simulator

ÆRIS is a browser-based RISC-V assembly simulator designed to help students learn computer architecture and low-level programming. It provides an environment where users can write, assemble, and execute **RV32I assembly programs** directly in the browser.

The simulator allows users to observe how a RISC-V program behaves at the instruction level, making it easier to understand how registers, memory, and control flow interact during execution.

## What It Does

ÆRIS takes RISC-V assembly source code and processes it through the typical stages of a program execution pipeline:

1. **Parsing** the source code into structured instructions and directives (`.text`, `.data`)
2. **Assembling** instructions into 32-bit machine code following the RISC-V specification
3. **Executing** instructions on a simulated processor with registers, memory, and an ALU
4. **Displaying** the resulting state after each step of execution

The simulator runs entirely in the browser, requiring no external toolchain or installation.

## Educational Goals

ÆRIS is designed to make key computer architecture concepts easier to understand by making them observable in real time. It allows students to explore:

- RISC-V instruction formats (R, I, S, B, U, and J)
- How instructions modify registers and memory
- The role of the **program counter (PC)** in controlling execution
- How pseudo-instructions expand into real instructions
- How system calls interact with the runtime environment
- How `.data` and `.text` segments are represented in memory

By stepping through instructions one at a time, users can trace exactly how a program evolves.

## Target Users

ÆRIS is intended for:

- **Computer architecture students** learning RISC-V assembly
- **Instructors** who want a simple way to demonstrate instruction execution
- **Self-learners** exploring low-level programming concepts

No prior experience with assemblers or emulators is required.

## Scope

ÆRIS focuses on clarity and educational value rather than full system emulation. The simulator currently implements the **RV32I base instruction set** and does not simulate advanced processor features such as:

- pipelines or caches
- branch prediction
- privilege modes
- floating-point extensions
- compressed instructions
- operating system environments

This limited scope keeps the simulator simple while still covering the core concepts needed to understand RISC-V assembly programming.