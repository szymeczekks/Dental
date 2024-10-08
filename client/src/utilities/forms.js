export const formAccount = [
    [
        {
            id: "username",
            placeholder: "użytkownik",
            type: "text",
            label: "Nazwa użytkownika",
            config: {
                required: "Podaj nazwę użytkownika"
            }
        },
        {
            id: "phone",
            placeholder: "+48123123123",
            type: "text",
            label: "Numer telefonu",
            config: {
                required: "Podaj numer telefonu",
                pattern: {
                    value: /^[+][0-9]{9,15}$/,
                    message: "Niepoprawny numer telefonu"
                }
            }
        },
    ],
    {
        id: "email",
        placeholder: "user@example.com",
        type: "email",
        label: "Email",
        config: {
            required: "Podaj adres email",
            pattern: {
                value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: "Niepoprawny adres email"
            }
        }
    },
    [
        {
            id: "name",
            placeholder: "Adam",
            type: "text",
            label: "Imię"
        },
        {
            id: "surname",
            placeholder: "Kowalski",
            type: "text",
            label: "Nazwisko"
        }
    ],
    [
        {
            id: "city",
            placeholder: "Warszawa",
            type: "text",
            label: "Miasto"
        },
        {
            id: "zip",
            placeholder: "00-999",
            type: "text",
            label: "Kod pocztowy",
            config: {
                maxLength: {
                    value: 6,
                    message: "Kod pocztowy jest za długi"
                },
                pattern: {
                    value: /^\d{2}-\d{3}$/,
                    message: "Niepoprawny kod pocztowy"
                }
            }
        }
    ]
];

export const formNotifications = [
    
    {
        id: "notifications_agree",
        name: "Powiadomienia",
        type: "toggle"
    },
    {
        id: "confirmation_agree",
        name: "Potwierdzenie rezerwacji",
        type: "checkbox"
    },
    {
        id: "cancellation_agree",
        name: "Odwołanie rezerwacji",
        type: "checkbox"
    },
    {
        id: "new_office_agree",
        name: "Nowy gabinet w pobliżu",
        type: "checkbox"
    }
]

export const formRegister = [
    {
        id: "username",
        type: "text",
        label: "Nazwa użytkownika",
        config: {
            required: "Podaj nazwę użytkownika"
        }
    },
    {
        id: "email",
        type: "email",
        label: "Email",
        config: {
            required: "Podaj adres email"
        }
    },
    {
        id: "password",
        type: "password",
        label: "Hasło",
        config: {
            required: "Podaj hasło"
        }
    },
]

export const formLogin = [
    {
        id: "username",
        type: "text",
        label: "Nazwa użytkownika",
        config: {
            required: "Podaj nazwę użytkownika"
        }
    },
    {
        id: "password",
        type: "password",
        label: "Hasło",
        config: {
            required: "Podaj hasło"
        }
    },
]

export const formInformations = [
    {
        id: "name",
        type: "text",
        label: "Nazwa gabinetu",
        config: {
            required: "Podaj nazwę gabinetu"
        }
    }
]

export const formUpdateService = [
    [
        {
            id: "price",
            placeholder: "100.00",
            type: "number",
            label: "Cena",
            config: {
                required: "Podaj cenę usługi"
            }
        },
        {
            id: "duration",
            placeholder: "45",
            type: "number",
            label: "Czas trwania (w minutach)",
            config: {
                required: "Podaj czas trwania usługi"
            }
        }
    ],
    {
        id: "description",
        placeholder: "Opis usługi",
        type: "text",
        label: "Opis",
        config: {
            required: "Podaj opis usługi"
        }
    }
]

export const formReservation = [
    [
        {
            id: "name",
            placeholder: "John",
            type: "text",
            label: "Imię",
            config: {
                required: "Podaj imię"
            }
        },
        {
            id: "surname",
            placeholder: "Doe",
            type: "text",
            label: "Nazwisko",
            config: {
                required: "Podaj nazwisko"
            }
        }
    ],
    {
        id: "service_name",
        type: "hidden",
    },
    {
        id: "booked_time",
        type: "hidden",
    },
    {
        id: "day",
        type: "hidden",
    },
    {
        id: "hour",
        type: "hidden",
    },
    {
        id: "employee_id",
        type: "hidden",
    },
    {
        id: "user_id",
        type: "hidden",
    },
    {
        id: "cabinet_id",
        type: "hidden",
    }
]