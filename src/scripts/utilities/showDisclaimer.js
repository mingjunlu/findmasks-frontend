import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const showDisclaimer = () => {
    const sentences = [
        '口罩數量與營業時段以藥局、衛生所實際情形為主，線上查詢之資訊僅供參考。',
        '部分藥局為方便民眾購買口罩而採發放號碼牌方式，健保署系統目前無法顯示已發送號碼牌數量。',
    ];
    const agreementContent = sentences.join('');

    try {
        // Parse the string from localStorage
        const agreement = JSON.parse(localStorage.getItem('agreement'));
        const { content, acceptedAt } = agreement;

        // Check if the content is the same
        if (content !== agreementContent) { throw new Error(); }

        // Check if the acceptedAt value is valid
        const acceptedDate = dayjs(acceptedAt);
        const isValid = acceptedDate.isValid() && acceptedDate.isBetween('2020-02-06', dayjs());
        if (!acceptedAt || !isValid) { throw new Error(); }

        // No need to show the disclaimer since the user has already accepted the agreement
        return;
    } catch (error) {
        localStorage.removeItem('agreement');
    }

    // eslint-disable-next-line no-alert
    if (window.confirm(sentences.join('\n\n'))) {
        // Make sure that the user won't see the disclaimer again
        localStorage.setItem('agreement', JSON.stringify({
            content: agreementContent,
            acceptedAt: new Date().toUTCString(),
        }));
    }
};

export default showDisclaimer;
