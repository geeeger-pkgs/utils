import Luckey from '../src/lucky';

jest.setTimeout(60000);

describe('@geeeger/lucky', () => {
    it('get finish index', () => new Promise((done) => {
        const luckey = new Luckey({
            count: 8,
            interval: 20,
            cycle: 40,
            prize: 5,
        });
        luckey.roll((finish1: boolean, index1: number) => {
            if (finish1) {
                expect(index1).toBe(5);
                luckey
                    .reset({
                        count: 12,
                        prize: 5,
                    })
                    .roll((finish: boolean, index: number) => {
                        if (finish) {
                            expect(index).toBe(5);
                            done();
                        }
                    });
            }
        });
    }));

    it('get finish index 20', () => new Promise((done) => {
        const luckey = new Luckey({
            count: 20,
            prize: 0,
        });
        luckey.roll((finish: boolean, index: number) => {
            if (finish) {
                expect(index).toBe(0);
                done();
            }
        });
    }));
});
