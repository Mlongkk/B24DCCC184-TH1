import { useState } from "react";

export interface Book {
    id: string;
    year: number;
    currentNumber: number;
}

export interface Decision {
    id: string;
    soQD: string;
    ngayBanHanh: string;
    bookId: string;
    viewCount: number;
}

export interface FieldConfig {
    id: string;
    name: string;
    type: "string" | "number" | "date";
}

export interface Certificate {
    id: string;
    soVaoSo: number;
    soHieu: string;
    msv: string;
    hoTen: string;
    ngaySinh: string;
    decisionId: string;
    extra: Record<string, any>;
}

export default function useSoVanBangModel() {
    const [yearBooks, setYearBooks] = useState<Book[]>([]);
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [degrees, setDegrees] = useState<Certificate[]>([]);
    const [fields, setFields] = useState<FieldConfig[]>([]);
    const [currentNumber, setCurrentNumber] = useState(0);

    // ================= BOOK =================
    const addBook = (year: number) => {
        const newNumber = currentNumber + 1;
        const newBook: Book = {
            id: Date.now().toString(),
            year,
            currentNumber: newNumber,
        };
        setYearBooks([...yearBooks, newBook]);
        setCurrentNumber(newNumber);
    };

    // ================= DECISION =================
    const addDecision = (data: Omit<Decision, "id" | "viewCount">) => {
        const newDecision: Decision = {
            ...data,
            id: Date.now().toString(),
            viewCount: 0,
        };
        setDecisions([...decisions, newDecision]);
    };

    // ================= FIELD CONFIG =================
    const addField = (field: Omit<FieldConfig, "id">) => {
        const newField: FieldConfig = {
            ...field,
            id: Date.now().toString(),
        };
        setFields([...fields, newField]);
    };

    const deleteField = (id: string) => {
        setFields(fields.filter((f) => f.id !== id));
        alert("Đã xóa field thành công!"); // Thông báo xóa thành công
    };

    // ================= CERTIFICATE =================
    const addCertificate = (data: Omit<Certificate, "id" | "soVaoSo"> & { bookId: string }) => {
        const book = yearBooks.find((b) => b.id === data.bookId);

        if (!book) return;

        const soVaoSo = book.currentNumber + 1;

        // update số trong sổ
        const updatedBooks = yearBooks.map((b) =>
            b.id === book.id ? { ...b, currentNumber: soVaoSo } : b
        );
        setYearBooks(updatedBooks);

        const newCert: Certificate = {
            ...data,
            id: Date.now().toString(),
            soVaoSo,
        };

        setDegrees([...degrees, newCert]);
    };

    const updateCertificate = (id: string, values: Partial<Certificate>) => {
        setDegrees(
            degrees.map((d) => (d.id === id ? { ...d, ...values } : d))
        );
    };

    const deleteCertificate = (id: string) => {
        setDegrees(degrees.filter((d) => d.id !== id));
    };

    // ================= SEARCH =================
    const searchCertificate = (params: Partial<Certificate>) => {
        const filled = Object.values(params).filter((v) => v);

        if (filled.length < 2) {
            return {
                error: "Nhập ít nhất 2 điều kiện",
                data: [],
            };
        }

        const result = degrees.filter((c) => {
            return (
                (!params.soHieu || c.soHieu.includes(params.soHieu)) &&
                (!params.msv || c.msv.includes(params.msv)) &&
                (!params.hoTen || c.hoTen.includes(params.hoTen)) &&
                (!params.ngaySinh || c.ngaySinh === params.ngaySinh) &&
                (!params.soVaoSo || c.soVaoSo === params.soVaoSo)
            );
        });

        // tăng lượt xem theo decision
        const updatedDecisions = decisions.map((d) => {
            const count = result.filter((c) => c.decisionId === d.id).length;
            return count > 0 ? { ...d, viewCount: d.viewCount + count } : d;
        });

        setDecisions(updatedDecisions);

        return {
            error: null,
            data: result,
        };
    };

    return {
        yearBooks,
        decisions,
        degrees,
        fields,

        setYearBooks,
        setDecisions,
        setDegrees,
        setFields,

        addBook,
        addDecision,
        addField,
        deleteField,

        addCertificate,
        updateCertificate,
        deleteCertificate,

        searchCertificate,
    };
}