import Papa from 'papaparse';

export const convertCsvToNumberArray = (file: File): Promise<number[]> => {
    return new Promise((res) => {
        Papa.parse(file, {
            header: false,
            complete: (result) => {
                const resultArr: number[] = (result.data as string[][])
                    .flatMap((element) => element)
                    .map((element) => parseFloat(element));
                resultArr.pop();

                res(resultArr);
            },
        });
    });
};
