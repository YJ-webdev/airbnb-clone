// import React from "react";
// import Image from "next/image";
// import { FileWithPreview } from "./image-upload"; // Assuming FileWithPreview type is exported
// import { X } from "lucide-react";

// interface ImageModalProps {
//   file: FileWithPreview;
//   onClose: () => void;
// }

// const ImageModal: React.FC<ImageModalProps> = ({ file, onClose }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="max-h-full max-w-full overflow-hidden rounded-xl">
//         <Image
//           src={file.preview}
//           width={file.width || 1000}
//           height={file.height || 1000}
//           alt="Full size"
//           onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
//         />
//         <button className="absolute right-4 top-4 text-white" onClick={onClose}>
//           <X size={34} className="rounded-full bg-black p-2 text-white" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImageModal;
