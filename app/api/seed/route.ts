import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { classesData, candidatesData } from "@/lib/seed-data";

export async function POST() {
  try {
    // 1. Clear existing data (in reverse order of dependencies)
    await supabase.from("votes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("students").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("candidates").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("classes").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // 2. Insert classes
    const classInserts = classesData.map((c) => ({
      name: c.name,
      angkatan: c.angkatan,
    }));

    const { data: insertedClasses, error: classError } = await supabase
      .from("classes")
      .insert(classInserts)
      .select();

    if (classError) {
      return NextResponse.json(
        { error: "Failed to insert classes", detail: classError },
        { status: 500 }
      );
    }

    // 3. Insert students for each class
    let totalStudents = 0;
    for (const classData of classesData) {
      const matchedClass = insertedClasses?.find((c) => c.name === classData.name);
      if (!matchedClass) continue;

      const studentInserts = classData.students.map((name) => ({
        name: name.trim(),
        class_id: matchedClass.id,
        has_voted: false,
      }));

      const { error: studentError } = await supabase
        .from("students")
        .insert(studentInserts);

      if (studentError) {
        return NextResponse.json(
          {
            error: `Failed to insert students for ${classData.name}`,
            detail: studentError,
          },
          { status: 500 }
        );
      }
      totalStudents += studentInserts.length;
    }

    // 4. Insert candidates
    const { error: candidateError } = await supabase
      .from("candidates")
      .insert(candidatesData);

    if (candidateError) {
      return NextResponse.json(
        { error: "Failed to insert candidates", detail: candidateError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      classes: insertedClasses?.length || 0,
      students: totalStudents,
      candidates: candidatesData.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error", detail: String(err) },
      { status: 500 }
    );
  }
}
