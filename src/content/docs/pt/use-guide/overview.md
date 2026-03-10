---
title: Overview
description: Overview of how to use the ÆRIS simulator.
---

# Use Guide Overview

ÆRIS provides an interactive environment for writing, assembling, and executing RISC-V assembly programs directly in the browser.  
The simulator interface is designed to make it easy to observe how a program behaves at the instruction level.

This guide explains how to use the simulator and how each part of the interface contributes to the execution workflow.

## Basic Workflow

Using ÆRIS typically follows a simple sequence:

1. **Write or load a program** in the editor.
2. **Assemble the code**, which parses and converts it into machine instructions.
3. **Execute the program** either step-by-step or continuously.
4. **Inspect the program state** through registers, memory, and console output.

During execution, the simulator updates the processor state after each instruction, allowing users to observe how values move through registers and memory.

## Main Interface Areas

The simulator interface is organized into several main areas:

| Area | Description |
|-----|-----|
| **Editor** | Where assembly programs are written or loaded. |
| **Execution Controls** | Buttons used to assemble, run, step through, or reset the program. |
| **Registers View** | Displays the current values of all 32 RISC-V registers. |
| **Memory View** | Shows memory regions such as `.data`, stack, and text segment. |
| **Console** | Displays program output and handles user input through syscalls. |
| **Runtime Information** | Displays the program counter and execution status. |

Each of these components will be explained in more detail in the following sections of this guide.

## What You Will Learn in This Guide

The remaining pages in the **Use Guide** explain how to:

- Navigate the simulator interface
- Write assembly programs in the editor
- Assemble and execute programs
- Inspect registers and memory
- Use the console and supported syscalls
- Configure simulator settings

By the end of this guide, you should be comfortable using ÆRIS to experiment with RV32I assembly programs and observe how they execute step by step.