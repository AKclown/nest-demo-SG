import { AppService } from './app.service';
import { CccDto } from './ccc.dto';
import { CccVo } from './ccc.vo';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    aaa(a1: any, a2: any): string;
    bbb(id: any): string;
    ccc(ccc: CccDto): CccVo;
}
