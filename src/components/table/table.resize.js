import { $ } from 'core/dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const resizerType = $resizer.$elmnt.dataset.resize;
    const $parent = $resizer.closest('[data-type="resizable"]');
    const colName = $parent.$elmnt.dataset.col;
    const sideProp = resizerType === 'col' ? 'bottom' : 'right';
    const coords = $parent.getCoords();
    $resizer.css({
        opacity: 1,
        zIndex: 1000,
        [sideProp]: '-5000px'
    });
    let value = undefined;

    document.onmousemove = (e) => {
        let delta = undefined;

        if (resizerType === 'col') {
            delta = Math.floor(e.pageX - coords.right);
            value = coords.width + delta;
            $resizer.css({ right: -delta + 'px' });
        } else {
            delta = Math.floor(e.pageY - coords.bottom);
            value = coords.height + delta;
            $resizer.css({
                bottom: -delta + 'px'
            });
        }
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (resizerType === 'col') {
            $parent.css({ width: value + 'px' });
            Array.from($root.findAll(`[data-columnowner='${colName}']`)).forEach((cell) => (cell.style.width = value + 'px'));
        }
        if (resizerType === 'row') {
            $parent.css({ height: value + 'px' });
            Array.from($root.findAll(`[data-columnowner='${colName}']`)).forEach((cell) => (cell.style.width = value + 'px'));
        }
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        });
    };
}
