import { z } from "zod";

// const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const _userSchema = z.object({
  firstName: z.string().nonempty("Vyžadováno"),
  email: z.string().nonempty("Vyžadováno"),
  // surname: z.string(),
  // photoUrl: z.string(),
  // phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  // select
  // scoops: z.number().int().min(1).default(1),
  // radio
  area: z.string().nonempty("Vyžadováno"),
  checkboxes: z.string().array(), //.min(1, "Please select at least one language"),
  test: z.string(),
});

export type UserSchema = typeof _userSchema;
