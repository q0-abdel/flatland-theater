
# Flatland Theater

An interactive 3D simulation of a theatrical improvisation exercise, built as an exploration of both theater pedagogy and creative coding using Lovable.

## About This Project

This project recreates an improvisation exercise I experienced in my theater class called "Story on a Line." It demonstrates how theatrical expression and dramaturgy can emerge without emotions or dialogue - simply through basic actions in a constrained, flatland-like universe.

The exercise reveals the fundamental power of movement, positioning, and spatial relationships in storytelling. By limiting characters to a single line and simple actions (moving, turning, interacting), we observe how compelling narratives naturally emerge from these basic theatrical elements.

This was also an opportunity to experiment with **Lovable**, an AI-powered coding platform, to see how quickly we could prototype and iterate on a 3D theater simulation through conversational programming.

## The Theater Exercise

**Goal:** To demonstrate that theatrical expression and dramaturgy can emerge without emotions or dialogue, using only simple actions in a constrained, flatland-like universe.

**Rules:**
- Characters can only move along a single line
- They can move forward, turn their body/head, or attempt interactions
- All actions are autonomous and emerge from simple behavioral rules
- No scripted emotions or dialogue - pure spatial storytelling

**Observation:** Even with these minimal constraints, observers witness the emergence of relationships, tensions, comedy, and drama purely through positioning and movement.

## Built With Lovable & Vibe Coding

This simulation was created using **Lovable** (https://lovable.dev), an AI editor for web applications, demonstrating rapid prototyping through conversational coding. The entire 3D theater environment was built through natural language descriptions and iterative refinement.

## Project info

**URL**: https://lovable.dev/projects/1e34e09f-6069-42b9-8b3e-275d7e6f170a

## Technologies Used

- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React** - UI framework
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn-ui** - Modern UI components

## How to Run Locally

If you want to work locally using your own IDE:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd flatland-theater

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## How to Deploy

Simply open [Lovable](https://lovable.dev/projects/1e34e09f-6069-42b9-8b3e-275d7e6f170a) and click on Share → Publish.

## Original Vibe Coding Specifications

Below are the complete specifications that guided the development of this simulation:

---

# Specifications: flatland-theater

## 1. Overview

The main objective is to create a **3D digital simulation with very high character realism**, named **flatland-theater**. The level of detail, animation, and expressiveness of the characters must aim for a **realism equivalent to or greater than that observed in games like The Sims**. This simulation reproduces a theatrical improvisation exercise ('Story on a Line') where we observe how dramaturgy can emerge from simple actions performed by these realistic characters, without any pre-programmed emotional intent.

The simulation features three autonomous characters moving **strictly on a defined line**, with highly constrained movement and interaction rules. Although the *rules* are simple, the *visual execution* (models, textures, animations) must be of the highest possible quality to achieve the goal of realism.

The characters act randomly within the limits of the defined rules. The user observes the proceedings without direct interaction, after setting a few initial parameters. The application must **imperatively prioritize the visual realism and expressiveness of the characters**. The ease of sharing via a simple URL link becomes **optional** and must under no circumstances compromise the objective of realism; if a desktop application is necessary to achieve the required visual quality, that is the path to be favored.

## 2. Main Features

### 2.1 Initial Configuration (Pre-Simulation)

-   **Objective:** Allow the user to define the basic parameters before launching the simulation.
-   **Expected Behavior:**
    -   The user can define the length of the movement line (in "units").
        -   *Default value:* 10 units.
        -   *Constraint:* Must be a positive integer (suggested minimum: 5 for 3 characters).
    -   The user can define the duration of an "action" in seconds (time between each decision/action by the characters).
        -   *Default value:* 1 second.
        -   *Constraint:* Must be a positive number (e.g., 0.5, 1, 2...).
-   **Interface:** A simple configuration panel displayed before the simulation starts.

### 2.2 Simulation Environment

-   **Objective:** Provide a credible visual setting to showcase the realistic characters.
-   **Visual Description (High Fidelity 3D for characters):**
    -   A theater stage. The environment (floor, walls, lighting) must be detailed enough not to clash with the realism of the characters, but can remain simpler to highlight them. Good lighting is essential.
    -   A thin white line drawn in the middle of the stage, parallel to the spectator's point of view. The line represents the **strict** axis of movement.
    -   The user's point of view is fixed, simulating a spectator seated in the audience facing the stage.
-   **Mechanical Description:**
    -   The visible line serves as a reference. Mechanically, it is segmented into N discrete units (length defined by the user).
    -   The characters' positions are defined by the unit they occupy on this line (e.g., unit 0, unit 1, ..., unit N-1). **Characters can never leave this axis.**

### 2.3 Characters

-   **Objective:** **Achieve a level of realism equivalent to or greater than The Sims.** This is the absolute priority of the project.
-   **Number:** 3 distinct characters.
-   **Visual Representation (High Realism):**
    -   Character 1: "Young woman" realistic 3D model, redhead with a ponytail.
    -   Character 2: "Boy" realistic 3D model, with glasses and a ponytail.
    -   Character 3: "Boy" realistic 3D model, brown-skinned with an afro.
    -   *Imperative Requirements:*
        -   **High-poly** 3D models with realistic human proportions.
        -   **High-resolution** textures for skin, hair, eyes, and clothing.
        -   **Full facial and body rigging** allowing for subtle and expressive animations.
        -   Animation system supporting **smooth blending** between different states (idle, walk, turn, interaction).
        -   **Realistic and natural animations** for all basic actions (idle breathing, blinking, slight weight shifts, fluid walking, believable body rotations, natural head movements).
-   **Autonomy:** Each character makes its action decisions independently and randomly at each time "tick".
-   **Initial Position:**
    -   Logical distribution on the line (e.g., `round(N/4)`, `round(N/2)`, `round(3*N/4)`).
    -   Initial body orientation is random (0, 90, 180, 270 degrees). Head is aligned.
-   **Validation Criteria:** At launch, the characters are on the line, distinct, and spaced apart. Their orientations are random. **Their appearance and basic animations achieve a high level of realism, comparable or superior to The Sims.**

### 2.4 Action System

-   **Objective:** Manage the random behavior and trigger the realistic actions of the characters.
-   **Timing:** Every X seconds, each character chooses and initiates *one* action.
-   **Action Selection:** Random choice among *possible* actions:
    1.  Move forward (if conditions are met)
    2.  Turn body (left or right)
    3.  Turn head (left or right, through 'forward')
    4.  Initiate an Interaction (if conditions are met)
    5.  Do nothing (remain in a realistic 'idle' animation)
-   **Validation Criteria:** At each interval, each character performs at most one action. The selection appears random. **Transitions between actions are smooth thanks to the animation system.**

### 2.5 Movement Rules (Body)

-   **Objective:** Define how characters move **on** the line, with realistic animations.
-   **Move Forward:**
    -   Identical logic of moving one unit, **strictly along the line**.
    -   **Condition 1 (Orientation):** Identical (profile at 90° or 270°).
    -   **Condition 2 (Space):** Identical (the unit ahead is free).
    -   **Condition 3 (Head):** Identical (head is aligned forward).
    -   **Visual Execution:** The action must trigger a **realistic and fluid walking animation** over one unit.
-   **Turn in Place:**
    -   Identical logic of rotation in 90° increments.
    -   **Visual Execution:** The action must trigger a **realistic rotation animation** (pivoting in place) with believable foot and body movement.
-   **Validation Criteria:** The logic of the rules is respected. **The walking and rotation animations are fluid, natural, and of high quality.**

### 2.6 Movement Rules (Head)

-   **Objective:** Define how the head moves, realistically.
-   **Rotation:** Same relative positions (-90°, 0°, +90°) and passage through 'forward'.
-   **Visual Execution:** The action must trigger a **natural head rotation animation**, not a simple mechanical pivot.
-   **Impact:** 'Forward' position required to move forward/interact.
-   **Validation Criteria:** The logic is respected. **The head rotation animation is realistic.**

### 2.7 Interaction Rules

-   **Objective:** Manage encounters with high-quality interaction animations.
-   **Trigger Condition:** Identical (adjacent, face-to-face on the line, heads straight).
-   **Initiation:** Identical (random choice if conditions are met).
-   **Interaction Types / Outcomes:**
    -   **Mutual Embrace:**
        -   *Condition:* Identical (both initiate simultaneously).
        -   *Logical Outcome:* Swap positions, rotate 180°.
        -   *Visual Execution:* Triggers a **realistic and expressive interaction animation** for the embrace and swap. The movements must be believable for human characters.
    -   **Unilateral Action (or non-reciprocal embrace):**
        -   *Condition:* Identical (only one initiates).
        -   *Logical Outcome:* No change in position/orientation.
        -   *Visual Execution:* Triggers a **realistic and expressive animation** of the attempt (e.g., reaching out arms, placing hands), with the other character remaining in an 'idle' animation or having a minimal non-engagement reaction.
-   **Validation Criteria:** The logic of the rules is respected. **The interaction animations are imperatively of high quality, fluid, expressive, and believable for realistic characters.**

### 2.8 User Control (During Simulation)

-   **Objective:** Allow the user to manage the overall flow.
-   **Commands:** `Start`, `Stop / Reset`.
-   **Interaction:** Passive observation only.
-   **Validation Criteria:** The buttons work as expected.

## 3. Technical Requirements and Constraints

### 3.1 Platform and Distribution

-   The **primary** target platform is a **desktop application** to guarantee the necessary resources for high-quality rendering and animation.
-   Sharing via a URL (web application) is **optional and strictly secondary**. It should only be considered if it is possible without significantly compromising the level of character realism. Failing the ability to share it via a URL (web application), propose solutions (an action plan to follow...) to allow for remote sharing.

### 3.2 Required Capabilities (Often implies an advanced game engine)

-   **High-Fidelity 3D Rendering Engine:** Ability to handle high-poly models, high-resolution textures, advanced lighting (global illumination, realistic shadows), complex materials (PBR - Physically Based Rendering).
-   **Advanced Animation System:** Management of complex skeletons (rigs), realistic skinning, animation blending, potentially Inverse Kinematics (IK), facial animation systems.
-   **Simulation Logic:** Management of the time loop, state, randomness, and basic rules (can be handled by scripts within a game engine).
-   **User Interface:** Integration of controls and configuration.

### 3.3 Essential Data to Manage

-   Global state, user parameters.
-   Detailed state of each character: ID, type, position, body/head orientation, **current animation state** (idle, walking, turning, interacting_embrace, interacting_attempt, etc.).
-   Time management.

### 3.4 Potential Technical Challenges (Very Significant)

-   **High-Quality Asset Creation or Acquisition:** The major challenge is obtaining 3D models, textures, rigs, and animations at a Sims+ level of realism. This often goes beyond code generation and requires artistic skills or the use of pre-existing asset libraries.
-   **Integration and Performance:** Running a simulation with 3 characters of this level of detail in real-time requires considerable optimization and powerful hardware.
-   **Complex Animation System:** Implementing an animation system (state machine, blending) that handles smooth transitions between simple actions but with realistic execution.
-   **Realistic Rendering:** Correctly configuring lighting, shaders, and post-processing effects to achieve the desired aesthetic.

---

## Connecting a Custom Domain

By default, your Lovable app is accessible via a Lovable staging subdomain (e.g., yoursite.lovable.app). However, you can connect your site to a custom domain (e.g., yourdomain.com) or a subdomain (e.g., subdomain.yourdomain.com) that you own.

To connect a custom domain, navigate to Project > Settings > Domains in Lovable.

Keep in mind that a paid Lovable plan is required to connect a custom domain.

## License

This project demonstrates the intersection of theatrical pedagogy and creative coding. Feel free to explore, modify, and use this as inspiration for your own theater-tech experiments.
