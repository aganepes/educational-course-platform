"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type Section = {
  title: string;
  duration: string;
  items: string[];
};

const sections: Section[] = [
  {
    title: "Introduction",
    duration: "4 minutes",
    items: [
      "Adam Rackis introduces the course by explaining why TypeScript's foundational role makes it uniquely risky to get wrong when generating code with AI. He previews the workshop's dive into core features like generics and mapped types, which will help viewers prompt AI more effectively and catch its mistakes.",
    ],
  },
  {
    title: "TypeScript Basics",
    duration: "48 minutes",
    items: [
      "Adam explains the difference between structural typing and nominal typing, emphasizing that in structural typing, types define the structure that valid values will hold rather than just the valid variables a value can be.",
      "Adam covers the basics of TypeScript, including type inference, the any type, unknown type, and never type. He also explains how to type functions, use unions, and create types for literal values like true and false.",
      "Adam covers a variety of real-world practical tips and tricks in TypeScript, emphasizing the use of the type of operator to extract static types from runtime values efficiently.",
      "Adam demonstrates how to use TanStack form, explaining the process of setting default values and utilizing the use form hook to create a form variable with statically typed properties.",
      "Adam explains the importance of exporting types when creating public APIs, emphasizing the need to export types for both function parameters and return types.",
      "Adam walks through the concept of conditional return types in TypeScript functions, explaining how TypeScript infers union types for conditional return values.",
    ],
  },
  {
    title: "Generics",
    duration: "48 minutes",
    items: [
      "Adam explores the concept of generics, comparing them to template systems in languages like C++. He breaks down how generics allow passing types as parameters.",
      "Adam explains how to properly handle generics in React components, demonstrating the importance of adding a generic type to the component.",
      "Adam explores the concept of generics, demonstrating how they can be used to maintain specificity in TypeScript by adding a generic argument to a method.",
      "Adam explains how to ensure that various functions in a codebase take the same arguments by creating a loader function that enforces argument consistency.",
      "Adam demonstrates how to use Zustand for state management in React, showing how to create a store with initial values and selectors.",
      "Adam demonstrates how to enhance a groupBy function by introducing generics to ensure more precise typing.",
      "Adam demonstrates how understanding TypeScript features, like generics and inferred typings, can streamline code changes and make AI integration easier.",
    ],
  },
  {
    title: "Unions",
    duration: "53 minutes",
    items: [
      "Adam Rackis explores TypeScript unions in depth, from narrowing and intersections to why enums should be avoided in favor of string literal unions.",
      "Adam Rackis walks through more type narrowing techniques that TypeScript recognizes from native JavaScript, including typeof and instanceof.",
      "Adam demonstrates how to create custom type guards in TypeScript to manually narrow types within a union.",
      "Adam demonstrates how to enforce exhaustive type checking in TypeScript by narrowing down unions until only 'never' is left.",
      "Adam explores excess property checking in TypeScript, demonstrating how assigning object literals to typed variables triggers errors.",
    ],
  },
  {
    title: "Conditional Types",
    duration: "51 minutes",
    items: [
      "Adam explores conditional types in TypeScript, demonstrating how to create basic conditional types using ternary operators.",
      "Adam demonstrates how to work with AI models to generate types for React components based on specific conditions.",
      "Adam demonstrates how to implement custom conditional types in TypeScript, starting with creating a get return type.",
      "Adam demonstrates how passing a union to a conditional type in TypeScript results in the conditional type running with each member.",
      "Adam demonstrates how to write type assertions for unit testing complex types in TypeScript.",
      "Adam walks through the process of implementing a type in TypeScript that checks if one tuple type is a subset of another.",
      "Adam explores the concept of managing argument lists in prefetch and load calls.",
    ],
  },
  {
    title: "Advanced Techniques",
    duration: "54 minutes",
    items: [
      "Adam explains the concept of function overloading, showcasing how to create multiple versions of a function based on the types of their parameters.",
      "Adam explores the concept of template literal types, demonstrating how to interpolate values and types inside a template literal type.",
      "Adam explains the concept of variance, covering covariance and contravariance in types.",
      "Adam demonstrates how TypeScript's map types enable helpful type transformations.",
      "Adam demonstrates how to strip functions and return types from an API object using TypeScript utility types like return type and Omit.",
      "Adam guides students through implementing a map type that converts date properties to strings while keeping other types unchanged.",
      "Adam demonstrates how to create a helper type for string or number keys, looping through keys and filtering out invalid ones.",
    ],
  },
  {
    title: "Wrapping Up",
    duration: "5 minutes",
    items: [
      "Adam wraps up the course by walking through an advanced mapped type exercise that filters and renames object keys using template literal types and conditional infer clauses.",
    ],
  },
];

export function TableOfContents() {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="py-12 border-t border-white/5">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Table of Contents</h2>

        <div className="max-w-3xl mx-auto space-y-2">
          {sections.map((section, index) => {
            const isOpen = openSections[index] ?? false;

            return (
              <div
                key={index}
                className="rounded-lg border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-purple-400 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{section.duration}</span>
                    {isOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-start gap-3 text-sm text-gray-300 pl-8"
                      >
                        <span className="text-purple-400 mt-0.5">▸</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}