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

export const formAddEmployee = [
    [
        {
            id: "name",
            type: "text",
            label: "Imię i nazwisko",
            config: {
                required: "Podaj imie i nazwisko"
            }
        },
        {
            id: "position",
            type: "text",
            label: "Nazwa stanowiska",
            config: {
                required: "Podaj nazwę stanowiska"
            }
        }
    ],
    [
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
        }
    ],
    [
        {
            id: "town",
            type: "text",
            label: "Miejsce zamieszkania"
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
    ],
    [
        {
            id: "street",
            type: "text",
            label: "Ulica"
        },
        {
            id: "building",
            type: "text",
            label: "Nr budynku / mieszkania"
        }
    ]
]

export const formUpdateService = [
    [
        {
            id: "price",
            placeholder: "100.00",
            type: "number",
            label: "Cena"
        },
        {
            id: "description",
            placeholder: "Opis usługi",
            type: "text",
            label: "Opis"
        }
    ]
]