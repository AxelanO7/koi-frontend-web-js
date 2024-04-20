import logo from "../assets/images/logo.png";
import icX from "../assets/icons/ic_x.png";
import icFacebook from "../assets/icons/ic_facebook.png";
import icTiktok from "../assets/icons/ic_tiktok.png";
import icInstagram from "../assets/icons/ic_instagram.png";
import icYoutube from "../assets/icons/ic_youtube.png";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import instikiImage from "../assets/images/instiki.png";
import kampusMerdekaImage from "../assets/images/kampus_merdeka.png";

const Footer = () => {
  const socials = [
    {
      name: "Facebook",
      icon: icFacebook,
      link: "https://www.facebook.com",
    },
    {
      name: "Tiktok",
      icon: icTiktok,
      link: "https://www.tiktok.com",
    },
    {
      name: "Twitter",
      icon: icX,
      link: "https://www.twitter.com",
    },
    {
      name: "Instagram",
      icon: icInstagram,
      link: "https://www.instagram.com",
    },
    {
      name: "Youtube",
      icon: icYoutube,
      link: "https://www.youtube.com",
    },
  ];
  return (
    <>
      <div>
        <div className="h-0.5 bg-gray-200" />
        <div className="flex mt-4 mx-12 justify-between space-x-8">
          <div>
            <img src={logo} className="w-[100px]" />
            <div className="flex space-x-4 mt-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={social.icon} className="w-6" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold cursor-pointer hover:text-poppy-500">
              Tentang Kami
            </p>
            <p className="text-sm font-normal cursor-pointer hover:text-poppy-500 mt-4">
              KOI atau Kegiatan Ormawa INSTIKI adalah platform yang untuk
              digitalisasi kegiatan organisasi kemahasiswaan berbasis website
            </p>
          </div>
          <div className="flex">
            <div>
              <p className="text-lg font-semibold cursor-pointer hover:text-poppy-500">
                Kontak Kami
              </p>
              <div className="space-y-2 mt-4">
                <div className="flex space-x-2 items-center">
                  <MapPinIcon className="w-6 h-6" />
                  <p className="text-sm font-normal cursor-pointer hover:text-poppy-500">
                    Jl. Tukad Pakerisan No. 97 Denpasar, Bali, Indonesia
                  </p>
                </div>
                <div className="flex space-x-2 items-center">
                  <PhoneIcon className="w-6 h-6" />
                  <p className="text-sm font-normal cursor-pointer hover:text-poppy-500">
                    +62 361-256-995
                  </p>
                </div>
                <div className="flex space-x-2 items-center">
                  <EnvelopeIcon className="w-6 h-6" />
                  <p className="text-sm font-normal cursor-pointer hover:text-poppy-500">
                    humas@instiki.ac.id
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-8 items-start ms-8 mt-8">
              <img src={instikiImage} className="w-24 object-contain" />
              <img src={kampusMerdekaImage} className="w-24 object-contain" />
            </div>
          </div>
        </div>
        <div className="h-0.5 bg-gray-200 my-4" />
        <p className="text-center text-base font-medium mb-4">
          Copyright © 2023 . All rights reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
