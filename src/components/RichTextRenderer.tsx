// import { generateBucketUrl } from "@/helper/utils";
// import Image from "next/image";
// import React from "react";

// type RichTextNode = {
//   type?: string;
//   children?: RichTextNode[];
//   text?: string;
//   bold?: boolean;
//   italic?: boolean;
//   underline?: boolean;
//   strikethrough?: boolean;
//   code?: boolean;
//   relationTo?: string;
//   value?: any;
// };

// interface RichTextRendererProps {
//   content: RichTextNode[];
// }

// const renderText = (node: RichTextNode): React.ReactNode => {
//   let element: React.ReactNode = node.text;

//   if (node.bold) element = <strong>{element}</strong>;
//   if (node.italic) element = <em>{element}</em>;
//   if (node.underline) element = <u>{element}</u>;
//   if (node.strikethrough) element = <del>{element}</del>;
//   if (node.code)
//     element = <code className="bg-gray-100 p-1 rounded">{element}</code>;

//   return element;
// };

// const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
//   const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
//     const { type, children, relationTo, value } = node;

//     if (type === "upload" && relationTo === "media" && value?.url) {
//       return (
//         <div key={index} className="my-4">
//           <Image
//             src={generateBucketUrl(value.url)}
//             alt={value.filename || "uploaded image"}
//             className="w-full h-auto rounded"
//             height={value.height}
//             width={value.width}
//           />
//         </div>
//       );
//     }

//     if (type === "relationship" && value?.title) {
//       return (
//         <div key={index} className="p-4 my-4 border rounded bg-gray-50">
//           <h4 className="text-lg font-semibold">{value.title}</h4>
//           {value.ctaText && value.ctaLink && (
//             <a
//               href={value.ctaLink}
//               className="text-blue-600 underline mt-2 inline-block"
//             >
//               {value.ctaText}
//             </a>
//           )}
//         </div>
//       );
//     }

//     const childrenElements = (children || []).map((child, idx) =>
//       renderNode(child, idx)
//     );

//     switch (type) {
//       case "h1":
//         return (
//           <h1 key={index} className="text-3xl font-bold my-4">
//             {childrenElements}
//           </h1>
//         );
//       case "h2":
//         return (
//           <h2 key={index} className="text-2xl font-semibold my-3">
//             {childrenElements}
//           </h2>
//         );
//       case "h3":
//         return (
//           <h3 key={index} className="text-xl font-medium my-2">
//             {childrenElements}
//           </h3>
//         );
//       case "ul":
//         return (
//           <ul key={index} className="list-disc pl-6 my-2">
//             {childrenElements}
//           </ul>
//         );
//       case "ol":
//         return (
//           <ol key={index} className="list-decimal pl-6 my-2">
//             {childrenElements}
//           </ol>
//         );
//       case "li":
//         return (
//           <li key={index} className="mb-1">
//             {childrenElements}
//           </li>
//         );
//       case "code":
//         return (
//           <pre
//             key={index}
//             className="bg-gray-200 p-3 rounded overflow-x-auto my-2"
//           >
//             <code>{childrenElements}</code>
//           </pre>
//         );
//       default:
//         if (node.text !== undefined)
//           return <span key={index}>{renderText(node)}</span>;
//         return <div key={index}>{childrenElements}</div>;
//     }
//   };

//   return <div>{content.map((node, index) => renderNode(node, index))}</div>;
// };

// export default RichTextRenderer;
