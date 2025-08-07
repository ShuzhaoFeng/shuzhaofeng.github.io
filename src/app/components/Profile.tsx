import Image from "next/image";
import profilePicture from "../assets/profile_picture.jpg";

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-gray-800 bg-gradient-to-br from-gray-900 to-black">
        <Image
          src={profilePicture}
          alt="Profile Picture"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
}
