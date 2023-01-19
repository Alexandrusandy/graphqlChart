import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";

const Chart = ({ groupedPosts }) => {
  const [svgWidth, setSvgWidth] = useState(window.innerWidth);
  const [svgHeight] = useState(500);
  const svgRef = useRef(null);
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };
  useEffect(() => {
    const handleResize = () => {
      setSvgWidth(svgRef.current.parentNode.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const xMax = svgWidth - margin.left - margin.right;
  const yMax = svgHeight - margin.top - margin.bottom;

  // We'll make some helpers to get at the data we want
  const x = useCallback((info) => info.id, []);
  const y = useCallback((info) => +info.count * 100, []);

  // And then scale the graph by our data
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: groupedPosts.map(x),
        padding: 0.1,
      }),
    [groupedPosts, xMax, x]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...groupedPosts.map(y))],
      }),
    [groupedPosts, yMax, y]
  );
  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data));
  const xPoint = useMemo(() => compose(xScale, x), [xScale, x]);
  const yPoint = useMemo(() => compose(yScale, y), [yScale, y]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Ju",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight}>
      {groupedPosts.map((item, index) => {
        const barHeight = yMax - yPoint(item);
        const monthName = () => months[index];
        return (
          <Group key={`bar-${index}`}>
            <Bar
              x={xPoint(item)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#fc2e1c"
            />
            <text
              x={xPoint(item) + xScale.bandwidth() / 2}
              y={yMax - barHeight + 20}
              textAnchor="middle"
            >
              {item.count}
            </text>
            <text
              x={xPoint(item) + xScale.bandwidth() / 2}
              y={yMax + 20}
              textAnchor="middle"
            >
              {monthName(item)}
            </text>
          </Group>
        );
      })}
    </svg>
  );
};

export default Chart;
