export type Company = {
    orgnumber: string;
    name: string;
    organisasjonsform: Organisasjonsform;
    rating: 1|2|3|4|5;
}

export type Organisasjonsform = {
    kode: string;
    beskrivelse: string;
    href: URL;
}
