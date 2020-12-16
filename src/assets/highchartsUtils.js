import Highcharts from 'highcharts';

// most styles copied from high-contrast-dark and high-contrast-light highchart themes.
export function setDarkMode() {
  const textBright = '#F0F0F3';
  Highcharts.setOptions({
    colors: [
      '#a6f0ff',
      '#70d49e',
      '#e898a5',
      '#007faa',
      '#f9db72',
      '#f45b5b',
      '#1e824c',
      '#e7934c',
      '#dadfe1',
      '#a0618b',
    ],
    chart: {
      backgroundColor: '#1f1f20',
    },
    title: {
      style: {
        color: textBright,
      },
    },
    subtitle: {
      style: {
        color: textBright,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: textBright,
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: textBright,
        },
        marker: {
          lineColor: '#333',
        },
      },
    },
  });
}

export function setLightMode() {
  const textDark = '#333';
  Highcharts.setOptions({
    colors: [
      '#5f98cf',
      '#434348',
      '#49a65e',
      '#f45b5b',
      '#708090',
      '#b68c51',
      '#397550',
      '#c0493d',
      '#4f4a7a',
      '#b381b3',
    ],
    chart: {
      backgroundColor: '#fff',
    },
    title: {
      style: {
        color: textDark,
      },
    },
    subtitle: {
      style: {
        color: textDark,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(247,247,247,0.85)',
      style: {
        color: textDark,
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: textDark,
        },
        marker: {
          lineColor: '#fff',
        },
      },
    },
  });
}
