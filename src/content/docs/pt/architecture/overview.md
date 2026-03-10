---
title: Architecture Overview
description: Overview of the internal architecture of the ÆRIS simulator.
---

# Architecture Overview

ÆRIS is designed as a modular simulator that models the essential components required to assemble and execute RISC-V programs.  
The architecture separates the different responsibilities involved in program execution, making the system easier to understand and extend.

At a high level, the simulator performs four major tasks:

1. **Parsing** assembly source code
2. **Analyzing and assembling** instructions
3. **Initializing** the simulated machine state
4. **Executing** instructions on a virtual CPU

Each of these responsibilities is handled by a dedicated part of the system.

---

## Assembly Pipeline

Before a program can run, the assembly source must be processed and converted into machine instructions.

The assembly pipeline typically includes the following stages:

- **Parser**  
  Reads the raw assembly source code and converts it into a structured representation.

- **Code Analyzer**  
  Resolves labels, validates instructions, and expands pseudo-instructions.

- **Assembler**  
  Encodes instructions into their 32‑bit RISC-V machine code representation.

The result of this process is a fully assembled program that can be loaded into simulated memory.

---

## CPU Initialization

Once the program has been assembled, the simulator prepares the execution environment.

This includes:

- loading instructions into the text segment
- loading data into the data segment
- initializing registers
- setting the **program counter (PC)** to the program entry point

After initialization, the virtual machine is ready to begin execution.

---

## Execution Engine

The execution engine simulates the behavior of a RISC-V processor.

For each instruction, the simulator performs a cycle similar to a real processor:

1. **Fetch** – read the instruction from memory using the program counter  
2. **Decode** – determine the instruction type and operands  
3. **Execute** – perform the operation using the ALU or control logic  
4. **Write Back** – update registers or memory with the result  
5. **Update PC** – advance or modify the program counter

This process repeats until the program terminates.

---

## Machine State

During execution, the simulator maintains a complete representation of the processor state.

This includes:

- **Register File** – the 32 general-purpose RISC-V registers
- **Memory** – program instructions, data, and stack
- **Program Counter (PC)** – the address of the current instruction

Every instruction modifies some part of this state, allowing users to observe how programs evolve step by step.

---

## System Calls

Programs interact with the outside environment through **syscalls**.

Syscalls allow programs to:

- print values to the console
- read user input
- terminate execution

The simulator intercepts these calls and performs the corresponding action in the browser environment.

---

## Design Goals

The architecture of ÆRIS focuses on three main goals:

- **Clarity** – make program execution easy to understand
- **Modularity** – separate major components such as parsing, assembly, and execution
- **Educational value** – expose internal processor state to help users learn how RISC-V works

Because of this design, the simulator prioritizes correctness and transparency over hardware-level optimizations.
