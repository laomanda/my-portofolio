
import * as Icons from 'lucide-react';

const expectedIcons = ['Check', 'Star', 'Zap', 'Smartphone', 'Layers', 'Box', 'Code', 'Palette', 'Eye', 'Gauge', 'Image', 'FileCode', 'Monitor', 'Blend'];

expectedIcons.forEach(iconName => {
    if (typeof Icons[iconName] === 'undefined') {
        console.log(`MISSING ICON: ${iconName} is undefined`);
    } else {
        console.log(`OK: ${iconName}`);
    }
});
