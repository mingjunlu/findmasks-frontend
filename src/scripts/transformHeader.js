const transformHeader = (header) => {
    if (header.includes('代碼')) { return 'id'; }
    if (header.includes('名稱')) { return 'name'; }
    if (header.includes('地址')) { return 'address'; }
    if (header.includes('電話')) { return 'phone'; }
    if (header.includes('成人口罩')) { return 'masksLeft'; }
    if (header.includes('兒童口罩')) { return 'childMasksLeft'; }
    if (header.includes('時間')) { return 'updatedAt'; }
    return header;
};

export default transformHeader;
