import { z } from "zod";

const baseSignUpFormSchema = z.object({
    name: z.string()
        .nonempty("이름을 입력해주세요")
        .min(2, "이름은 2자 이상이어야 합니다.")
        .max(20, "이름은 20자 이하여야 합니다.")
        .trim(),

    email: z.string()
        .nonempty("이메일을 입력해주세요")
        .email("올바른 이메일 형식이 아닙니다.")
        .trim(),

    password: z.string()
        .nonempty("비밀번호를 입력해주세요")
        .min(8, "비밀번호는 8자 이상이어야 합니다.")
        .max(50, "비밀번호는 50자 이하여야 합니다.")
        .regex(/[a-z]/, "비밀번호는 최소 하나의 소문자를 포함해야 합니다.")
        .regex(/\d/, "비밀번호는 최소 하나의 숫자를 포함해야 합니다.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "비밀번호는 최소 하나의 특수 문자를 포함해야 합니다."),

    confirmPassword: z.string()
        .nonempty("비밀번호 확인을 입력해주세요."),
});

export const signUpFormSchema = baseSignUpFormSchema
    .refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        path: ["confirmPassword"],
    });

export const SignUpRequestBodySchema = baseSignUpFormSchema.omit({ confirmPassword: true });

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export type SignUpRequestBodyType = z.infer<typeof SignUpRequestBodySchema>;
