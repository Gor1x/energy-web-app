import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import GridLayout from 'react-grid-layout';

const FileTab = (props) => {
    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div className='roundbox' key="a" data-grid={{ x: 0, y: 0, w: 3, h: 4, minW: 2, maxW: 4 }}>
            результат запуска алгоритма на каком-то датасете
            (отображается какой-то префикс, но есть возможность скопировать в буфер или скачать)
          </div>
          <div className='roundbox' key="b" data-grid={{ x: 0, y: 5, w: 3, h: 4, minW: 2, maxW: 4 }}>
            результат запуска алгоритма на каком-то датасете
            (отображается какой-то префикс, но есть возможность скопировать в буфер или скачать)
          </div>
          <div className='roundbox' key="c" data-grid={{ x: 0, y: 9, w: 3, h: 4, minW: 2, maxW: 4 }}>
            результат запуска алгоритма на каком-то датасете
            (отображается какой-то префикс, но есть возможность скопировать в буфер или скачать)
          </div>
          <div className='roundbox' key="d" data-grid={{ x: 4, y: 0, w: 4, h: 12 }}>
            код алгоритма
          </div>
        </GridLayout>
    );
}

export default FileTab;