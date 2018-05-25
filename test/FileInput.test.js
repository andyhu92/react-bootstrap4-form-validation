import { ValidationForm, FileInput, parseFileSize } from '../lib'

describe("parseFile function", () => {
    it("should parse file size correctly", () => {
        expect(parseFileSize("1b")).toBe(1);
        expect(parseFileSize("10 b")).toBe(10);
        expect(parseFileSize("12KB")).toBe(12*1024);
        expect(parseFileSize("50mb")).toBe(50*1024*1024);
        expect(parseFileSize("1gb")).toBe(1*1024*1024*1024);
        expect(parseFileSize("24.6gb")).toBe(24.6*1024*1024*1024);
    })

    it("should throw error when receiving unsupported unit", () => {
        expect(() => parseFileSize("1 tb")).toThrow();
        expect(() => wparseFileSize("10 bx")).toThrow();
    })
})