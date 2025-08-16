import fs from "fs/promises";
import { Pill } from "@payloadcms/ui";
import "./version-info.css";

export async function VersionInfo() {
  const packageJson = JSON.parse(await fs.readFile("./package.json", "utf-8"));
  return (
    <div className="version-info">
      <Pill pillStyle="light-gray" rounded>
        v{packageJson.version}
      </Pill>
    </div>
  );
}
