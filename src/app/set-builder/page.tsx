import { getAllSkills } from "@/app/api/mhdb/skills";
import { getAllArmor } from "@/app/api/mhdb/armor";
import SetBuilderClient from "./client";

export default async function SetBuilderPage() {
  const [skills, armors] = await Promise.all([
    getAllSkills(),
    getAllArmor(),
  ]);

  return <SetBuilderClient skills={skills} armors={armors} />;
}
