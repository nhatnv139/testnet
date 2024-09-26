import * as React from "react";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Select, { selectClasses, SelectOption } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Image from "next/image";
import img1 from "../../public/images/united-kingdom.svg";
import img2 from "../../public/images/vn.svg";
import img3 from "../../public/images/ru.svg";
import img4 from "../../public/images/de.svg";
import img5 from "../../public/images/fr.svg";
import img6 from "../../public/images/chin.svg";
import img7 from "../../public/images/jp.svg";
import img10 from "../../public/images/kr.svg";
import img8 from "../../public/images/in.svg";
import img9 from "../../public/images/sa.svg";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { defaultLocale } from "@/config/constants/language";

const options = [
  { value: "ar", label: "Arabic", src: img9 },
  { value: "zh", label: "Chinese", src: img6 },
  { value: "en", label: "English", src: img1 },
  { value: "de", label: "German", src: img4 },
  { value: "hi", label: "Hindi", src: img8 },
  { value: "fr", label: "French", src: img5 },
  { value: "ko", label: "Korean", src: img10 },
  { value: "ru", label: "Russian", src: img3 },
  { value: "ja", label: "Japanese", src: img7 },
  { value: "vi", label: "Vietnamese", src: img2 },
];

function renderValue(option: SelectOption<string> | null) {
  if (!option) {
    return null;
  }

  return (
    <React.Fragment>
      <ListItemDecorator>
        <Image
          src={options.find((o) => o.value === option.value)?.src}
          alt="picture"
          width={24}
          height={24}
          loading="lazy"
        />
      </ListItemDecorator>
      {option.label}
    </React.Fragment>
  );
}

export default function SelectCustomOption() {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const currentLocale = i18n.language;
  let pathname = usePathname();
  
  const handleChangeLanguage = (e: any, value: any) => {
    const selectedLanguage = value;

    localStorage.setItem('selectedLanguage', value);
    i18n.changeLanguage(selectedLanguage);

    if (currentLocale === defaultLocale) pathname = `/${value}${pathname}`
    else pathname = pathname.replace(`/${currentLocale}`, `/${value}`);
    router.push(pathname)
    router.refresh();
  };

  return (
    <Select
      defaultValue={currentLocale}
      onChange={(e, value) => handleChangeLanguage(e, value)}
      variant="solid"
      // indicator={<KeyboardArrowDown />}
      indicator={<KeyboardArrowDown />}
      color="neutral"
      slotProps={{
        listbox: {
          sx: {
            "--ListItemDecorator-size": "44px",

          },
        },
      }}
      sx={{
        "--ListItemDecorator-size": "44px",
        "background": "transparent",
        minWidth: 145,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
      renderValue={renderValue}
    >
      {options.map((option, index) => (
        <React.Fragment key={option.value}>
          {index !== 0 ? (
            <ListDivider role="none" inset="startContent" />
          ) : null}
          <Option value={option.value} label={option.label}>
            <ListItemDecorator>
              <Image loading="lazy" src={option.src} alt="picture" width={24} height={24} />
            </ListItemDecorator>
            {option.label}
          </Option>
        </React.Fragment>
      ))}
    </Select>
  );
}
