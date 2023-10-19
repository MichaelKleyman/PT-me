/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, useRef, MutableRefObject } from "react";
import { Patient } from "../../types";
import * as d3 from "d3";
import styles from "../styles/doughnut.module.css";

type DataItem = {
  name: string;
  value: number;
};
type DonutChartProps = {
  width: number;
  height: number;
  data: DataItem[];
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

const colors = [
  "#e0ac2b",
  "#e85252",
  "#6689c6",
  "#9a6fb0",
  "#a53253",
  "#69b3a2",
];

interface Props {
  patients?: Patient[] | undefined;
}

interface InjuryPercentage {
  name: string;
  value: number;
}
const injuryDictionary = [
  "Shoulders",
  "Back",
  "Knee",
  "Hip",
  "Neck",
  "Wrist/Hand",
  "Ankle/Foot",
  "Abdominal",
  "Gluteal",
];

const injuryColorTypes: { [key: string]: string } = {
  Shoulders: "#9de219",
  Back: "#90cc38",
  Knee: "#068c35",
  Hip: "#006634",
  Neck: "#004d38",
  "Wrist/Hand": "#033939",
  "Ankle/Foot": "#9de219",
  Abdominal: "#90cc38",
  Gluteal: "#068c35",
};

export default function DoughnutChart({ patients }: Props) {
  const [injuryPercentage, setInjuryPercentage] = useState<InjuryPercentage[]>([
    { name: "Shoulders", value: 0 },
    { name: "Back ", value: 0 },
    { name: "Knee", value: 0 },
    { name: "Hip", value: 0 },
    { name: "Neck", value: 0 },
    { name: "Wrist/Hand", value: 0 },
    { name: "Ankle/Foot", value: 0 },
    { name: "Abdominal", value: 0 },
    { name: "Gluteal", value: 0 },
  ]);

  useEffect(() => {
    const injuryCount: any = {};
    patients?.forEach((patient) => {
      const injuryId = injuryDictionary[patient.injuryId - 1];
      injuryCount[injuryId] = (injuryCount[injuryId] || 0) + 1;
    });
    const injuryPercentageArr: any = [];
    for (const id in injuryCount) {
      if (patients?.length) {
        const percentage = (injuryCount[id] / patients?.length) * 100;
        injuryPercentageArr.push({
          name: id,
          value: Math.round(percentage),
          color: injuryColorTypes[id],
        });
        // injuryPercentageObj[id] = percentage;
      }
    }
    setInjuryPercentage((prevArr) => {
      return prevArr.map((prevItem) => {
        const newItem = injuryPercentageArr.find(
          (newItem: InjuryPercentage) => newItem.name === prevItem.name
        );
        if (newItem) {
          return newItem;
        }
        return prevItem; // Keep the old item if no matching name is found
      });
    });
  }, [patients]);

  const ref = useRef<SVGGElement | null>(null);

  const width = 670;
  const height = 400;

  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
  const innerRadius = radius / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3
      .pie<any, DataItem>()
      .value((d) => (d.value === 0 ? d.value + 7 : d.value));
    return pieGenerator(injuryPercentage);
  }, [injuryPercentage]);

  const arcGenerator = d3.arc();
  const shapes: any[] = [];
  pie.forEach((grp, i) => {
    // First arc is for the donut
    const sliceInfo = {
      innerRadius,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label =
      grp.value === 7
        ? grp.data.name + " (" + "0" + "%)"
        : grp.data.name + " (" + grp.value + "%)";

    shapes.push(
      <g
        key={i}
        className={styles.slice}
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.classList.add(styles.hasHighlight);
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.classList.remove(styles.hasHighlight);
          }
        }}
      >
        <path d={slicePath!} fill={colors[i]} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline='middle'
          fontSize={14}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g
        transform={`translate(${width / 2}, ${height / 2})`}
        className={styles.container}
        // ref={ref}
      >
        {shapes.length && shapes}
      </g>
    </svg>
  );
}
