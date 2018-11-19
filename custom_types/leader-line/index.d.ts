declare module 'leader-line' {

    export class LeaderLine {
        constructor(startElement: HTMLElement, endElement: HTMLElement, options: {});
        hide(): void;
        show(): void;
        position(): void;
    }
}