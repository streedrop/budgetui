import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

import { amountFormatter } from '@/utils/formatters';
import { getCustomBar, capitalize } from '@/utils/charts';

function Chart({ data, height }) {

    return (
        <BarChart
            height={height}
            width={`100%`}
            data={data}
            layout="horizontal"
        >
            <XAxis type="category" dataKey="month" />
            <YAxis type="number" />
            <Bar dataKey="income" maxBarSize={60} shape={getCustomBar("colorIncome")} />
            <Bar dataKey="expenses" maxBarSize={60} shape={getCustomBar("colorExpenses")} />
            <Tooltip
                labelFormatter={() => ''}
                formatter={(value, name, props) => [amountFormatter(value), capitalize(props.name)]}
            />
            <RechartsDevtools />
        </BarChart>
    );
}

export default Chart