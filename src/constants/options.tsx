import { Flex } from "antd";

export const getCountryOptions = () => [
  {
    value: "+66",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://flagcdn.com/w20/th.png"
          alt="Thailand"
          style={{ width: 20, height: "auto", borderRadius: "2px" }}
        />
        <span>+66</span>
      </div>
    ),
  },
  {
    value: "+1",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://flagcdn.com/w20/us.png"
          alt="USA"
          style={{ width: 20, height: "auto", borderRadius: "2px" }}
        />
        <span>+1</span>
      </div>
    ),
  },
  {
    value: "+44",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://flagcdn.com/w20/gb.png"
          alt="UK"
          style={{ width: 20, height: "auto", borderRadius: "2px" }}
        />
        <span>+44</span>
      </div>
    ),
  },
  {
    value: "+81",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://flagcdn.com/w20/jp.png"
          alt="Japan"
          style={{ width: 20, height: "auto", borderRadius: "2px" }}
        />
        <span>+81</span>
      </div>
    ),
  },
];

export const getGenderOptions = (t: (key: string) => string) => [
  {
    value: 1,
    className: "option-1",
    label: (
      <Flex gap="small" justify="center" align="center" vertical>
        <img
          src="/images/male.svg"
          alt="male"
          style={{ width: 24, height: 24 }}
        />
        {t("gender.male")}
      </Flex>
    ),
  },
  {
    value: 2,
    className: "option-2",
    label: (
      <Flex gap="small" justify="center" align="center" vertical>
        <img
          src="/images/female.svg"
          alt="female"
          style={{ width: 24, height: 24 }}
        />
        {t("gender.female")}
      </Flex>
    ),
  },
  {
    value: 3,
    className: "option-3",
    label: (
      <Flex gap="small" justify="center" align="center" vertical>
        <img
          src="/images/other.svg"
          alt="other"
          style={{ width: 24, height: 24 }}
        />
        {t("gender.other")}
      </Flex>
    ),
  },
];

export const getNationalityOptions = (t: (key: string) => string) => [
  { label: t("person.thai"), value: "Thai" },
  { label: t("person.american"), value: "American" },
  { label: t("person.british"), value: "British" },
  { label: t("person.japanese"), value: "Japanese" },
];
