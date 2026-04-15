import Notification from './Notification'

function UncategorizedNotification({ amount }) {
    return (
        <Notification importance="warning" url='/categories/uncategorized'>
            <h4>Transactions non-catégorisées</h4>
            <p>Vous avez {amount} transactions à catégoriser.</p>
        </Notification>
    )
}

export default UncategorizedNotification