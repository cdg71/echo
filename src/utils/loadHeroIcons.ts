import { neverTypeGuard } from "@src/utils/neverTypeGuard";
import { readFile } from "fs/promises";

interface Props {
  iconName: string;
  family?: "Outline" | "Solid" | "Mini" | "Micro";
  className?: string;
}

const defaultProps = {
  className: "size-8",
  family: "Outline",
};

// Function to load SVG file and replace class attribute with provided className
export const loadHeroIcons = async (props: Props) => {
  const { iconName, family, className } = { ...defaultProps, ...props };
  let familyPath = "";
  switch (family) {
    case "Micro": // Micro : 16x16, Solid fill
      familyPath = "16/solid";
      break;

    case "Mini": // Mini : 20x20, Solid fill
      familyPath = "20/solid";
      break;

    case "Outline": // Outline : 24x24, 1.5px stroke
      familyPath = "24/outline";
      break;

    case "Solid": // Solid : 24x24, Solid fill
      familyPath = "24/solid";
      break;

    default: {
      neverTypeGuard(familyPath as never);
    }
  }
  // Define the path to the SVG file based on the family
  const filePath = `${process.cwd()}/node_modules/heroicons/${familyPath}/${iconName}.svg`; // Adjust the path as needed

  try {
    // Load SVG file as string
    let svgContent = await readFile(filePath, "utf8");

    // Replace class attribute with provided className, or append it if className is provided
    if (className) {
      // Match the existing class attribute
      const classRegex = /class="([^"]*)"/g;
      const match = classRegex.exec(svgContent);
      if (match) {
        // If class attribute exists, append className to it
        const existingClass = match[1];
        const newClass = `${existingClass} ${className}`;
        // Replace the existing class attribute with the modified one
        svgContent = svgContent.replace(classRegex, `class="${newClass}"`);
      } else {
        // If class attribute does not exist, simply add className
        svgContent = svgContent.replace(/<svg/, `<svg class="${className}"`);
      }
    }

    return svgContent;
  } catch (error) {
    return ""; // Return empty string in case of error
  }
};
